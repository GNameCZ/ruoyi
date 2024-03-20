const callbacks = {};

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
const loadScript = (src: string, callback: Function) => {
  const existingScript = document.getElementById(src);
  const cb = callback || (() => {});
  if (!existingScript) {
    callbacks[src] = [];
    const $script = document.createElement('script');
    $script.src = src;
    $script.id = src;
    $script.async = Boolean(1);
    document.body.appendChild($script);
    const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script);
    onEnd($script);
  }

  callbacks[src].push(cb);

  function stdOnEnd(this: any, script: any) {
    script.onload = () => {
      this.onerror = this.onload = null;
      callbacks[src].forEach((item) => {
        item(null, script);
      });
      delete callbacks[src];
    };
    script.onerror = () => {
      this.onerror = this.onload = null;
      cb(new Error(`Failed to load ${src}`), script);
    };
  }

  function ieOnEnd(this: any, script: any) {
    script.onreadystatechange = () => {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
      this.onreadystatechange = null;
      callbacks[src].forEach((item) => {
        item(null, script);
      });
      delete callbacks[src];
    };
  }
};

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export const loadScriptQueue = (list: Array<any>, cb: Function) => {
  const first = list.shift();
  list.length ? loadScript(first, () => loadScriptQueue(list, cb)) : loadScript(first, cb);
};

export default loadScript;
