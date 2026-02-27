const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

module.exports = function markdownLoader(source: any) {
  // 解析 front matter 和内容
  const { data, content } = matter(source);

  // 使用 markdown-it 将 markdown 转换为 html
  const md = new MarkdownIt();
  const htmlContent = md.render(content);

  // 返回一个 JavaScript 模块，其中包含 front matter 数据和 html 内容
  return `
    export const metadata =  $ {JSON.stringify(data)};    export default \` $ {htmlContent}\`;
  `;
};
