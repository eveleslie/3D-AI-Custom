import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal,useGLTF,useTexture } from "@react-three/drei";

import state from "../store";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei/core";
import { useRef } from "react";

const Backdrop = () =>{
    const shadows = useRef();
    return(
        <AccumulativeShadows
        position={[0,0, -0.14]}
        >
            <RandomizedLight
            amount={4} />
        </AccumulativeShadows>
    )
}

export default Backdrop;