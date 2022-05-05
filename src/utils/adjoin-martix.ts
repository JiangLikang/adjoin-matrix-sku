export type AdjoinType = Array<string>;

export default class AdjoinMatrix {
  vertexes: AdjoinType; // 顶点数组
  adjoinArray: Array<Array<0 | 1>>; // 矩阵数组

  constructor(vertexes: AdjoinType) {
    // 初始化邻接矩阵
    this.vertexes = vertexes;
    const quantity = vertexes.length;
    this.adjoinArray = Array(quantity).fill(Array(quantity).fill(0));
  }

   /*
   * 填写邻接矩阵的值
   */
  setVertexAdjoins(vertex: string, adjoins: AdjoinType) {
    const vIndex = this.vertexes.indexOf(vertex);
    adjoins.forEach((adjoin) => {
      const aIndex = this.vertexes.indexOf(adjoin);
      const newCol = [...this.adjoinArray[vIndex]];
      newCol.splice(aIndex, 1, 1);
      this.adjoinArray[vIndex] = newCol
    });
  }

  /*
   * 传入顶点的值，获取该顶点的列
   */
  getVertexCol(vertex: string) {
    const index = this.vertexes.indexOf(vertex);
    return this.adjoinArray[index];
  }

  /*
   * 传入一个顶点数组，求出并集
   */
  getCollection(vertexes: AdjoinType) {
    const vertexCols = vertexes.map((v) => this.getVertexCol(v));
    const collections: AdjoinType = this.vertexes.reduce((pre: AdjoinType, cur, index) => {
      const row = vertexCols.map(col => col[index]);
      if (row.some(Boolean)) {
        return [...pre, cur];
      } else {
        return pre;
      }
    }, []);
    return collections;
  }

  /*
   * 传入一个顶点数组，求出交集
   */
  getUnions(vertexes: AdjoinType) {
    const vertexCols = vertexes.map((v) => this.getVertexCol(v));
    const unions: AdjoinType = this.vertexes.reduce((pre: AdjoinType, cur, index) => {
      const row = vertexCols.map(col => col[index]);
      if (row.every(Boolean)) {
        return [...pre, cur];
      } else {
        return pre;
      }
    }, []);
    return unions;
  }
}
