// https://www.npmjs.com/package/mitt
import mitt from 'mitt';

// 类型
type Events = {};
const emitter = mitt<Events>();

// 导出
export default emitter;
