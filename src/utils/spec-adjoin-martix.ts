import AdjoinMatrix from "./adjoin-martix";
import { AdjoinType } from "./adjoin-martix";
import { SpecCategoryType, CommoditySpecsType } from "../redux/reducer/spec-reducer";

export default class SpecAdjoinMatrix extends AdjoinMatrix {
  specList: Array<CommoditySpecsType>;
  specCombinationList: Array<SpecCategoryType>;

  constructor(specList: Array<CommoditySpecsType>, specCombinationList: Array<SpecCategoryType>) {
    super(specList.reduce((total: AdjoinType, current) => [...total, ...current.list], []));
    this.specList = specList;
    this.specCombinationList = specCombinationList;
    // 根据可选规格列表创建邻接矩阵
    this.initSpec();
  }

  /**
   * 根据可选规格组合填写邻接矩阵的值
   */
  initSpec() {
    this.specCombinationList.forEach(({ specs }) => {
      specs.forEach(s => this.setVertexAdjoins(s, specs));
    });
  }

  /*
   * @params
   * 传入顶点数组，查询出可选规格
   */
  getSpecscOptions(vertexes: AdjoinType) {
    let specOptionCanchoose: AdjoinType = [];
    if (vertexes.some(Boolean)) {
      // 获取可选项（交集）
      specOptionCanchoose = this.getUnions(vertexes);
    } else {
      // 所有可选项
      specOptionCanchoose = this.getCollection(this.vertexes);
    }
    return specOptionCanchoose;
  }
}
