import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/root-reducer";
import SpecAdjoinMatrix from "../utils/spec-adjoin-martix";
import "./spec.css";
const classNames = require("classnames");

const Spec: React.FC = () => {
  const { specList, specCombinationList } = useSelector((state: RootState) => state.spec);
  // 已选择的规格，长度为规格列表的长度
  const [specsS, setSpecsS] = useState<Set<string>>(new Set([]));

  // 创建一个规格矩阵
  const specAdjoinMatrix = useMemo(() => new SpecAdjoinMatrix(specList, specCombinationList), [specList, specCombinationList]);
  // 获得可选项表
  const optionSpecs = useMemo(() => specAdjoinMatrix.getSpecscOptions(Array.from(specsS)), [specsS]);

  const handleClick = useCallback(function (bool: boolean, text: string) {
    // 排除可选规格里面没有的规格
    if (!bool) return;
    // 根据text判断是否已经被选中了
    const newSpecsS = new Set(specsS)
    if (specsS.has(text)) {
      newSpecsS.delete(text);
    } else {
      newSpecsS.add(text);
    }
    setSpecsS(newSpecsS);
  }, [specsS]);

  return (
    <div className="container">
      {specList.map(({ title, list }, index) => (
        <div key={index}>
          <p className="title">{title}</p>
          <div className="specBox">
            {list.map((value, i) => {
              const isOption = optionSpecs.includes(value); // 当前规格是否可选
              const isActive = specsS.has(value); // 当前规格是否被选
              return (
                <span
                  key={i}
                  className={classNames({
                    specOption: true,
                    specActive: isActive,
                    specDisabled: !isOption,
                  })}
                  onClick={() => handleClick(isOption, value)}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spec;
