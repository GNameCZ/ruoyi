/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0
 *Title: form-generator/Element UI表单设计及代码生成器
 *GitHub: https://github.com/JakHuang/form-generator
 */
const DRAWING_ITEMS = 'drawingItems';
const DRAWING_ID = 'idGlobal';
const TREE_NODE_ID = 'treeNodeId';
const FORM_CONF = 'formConf';

export const getDrawingList = () => {
  const str = localStorage.getItem(DRAWING_ITEMS);
  if (!['undefined', 'null'].includes(str)) return JSON.parse(str);
  return null;
};

export const saveDrawingList = (list: any) => {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list));
};

export const getIdGlobal = () => {
  const str = localStorage.getItem(DRAWING_ID);
  if (+str) return parseInt(str, 10);
  return 100;
};

export const saveIdGlobal = (id: any) => {
  localStorage.setItem(DRAWING_ID, `${id}`);
};

export const getTreeNodeId = () => {
  const str = localStorage.getItem(TREE_NODE_ID);
  if (str) return parseInt(str, 10);
  return 100;
};

export const saveTreeNodeId = (id: any) => {
  localStorage.setItem(TREE_NODE_ID, `${id}`);
};

export const getFormConf = () => {
  const str = localStorage.getItem(FORM_CONF);
  if (str) return JSON.parse(str);
  return null;
};

export const saveFormConf = (obj: any) => {
  localStorage.setItem(FORM_CONF, JSON.stringify(obj));
};
