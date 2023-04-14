import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);
    // 给每一帧设置
    useFrame((state, delta) => {
        // 设置多设备响应式
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // 设置模型初始化位置
        let targetPosition = [-0.4, 0, 2];
        if(snap.intro){
            if(isBreakpoint) targetPosition=[0,0,2];
            if(isMobile) targetPosition = [0, 0.2, 2.5];

        } else{
            if(isMobile) targetPosition = [0,0,2.5]
            else targetPosition = [0,0,2]
        }

        // 设置模型相机位置
        easing.damp3(state.camera.position,targetPosition,0.25,delta)
        //设置模型旋转
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )

    })


    return <group ref={group}>{children}</group>
}

export default CameraRig;