
import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal,useGLTF,useTexture } from "@react-three/drei";

import state from "../store";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei/core";
import { useRef } from "react";

const Tab = ({tab, isFilterTab,isActiveTab,handleClick}) =>{
    const snap = useSnapshot(state)
    //      左边Tab栏背景，透明圆角
    const activeStyles = isFilterTab && isActiveTab ? 
    {backgroundColor:snap.color,opacity:0.5}
    :{backgroundColor:"transparent",opacity:1}
    return(
        <div
        key={tab.name}
        className={`tab-btn ${isFilterTab ? 'rounded-full glassmorhism' : 'rounded-4'}`}
        onClick={handleClick}
        style={activeStyles}>
        
        {/* tab中的图标 */}
        <img
        src={tab.icon} 
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3':'w-11/12 h-11/12 object-contain'}`}
        />




        </div>
    )
}

export default Tab;