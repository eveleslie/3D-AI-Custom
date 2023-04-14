import React,{useState,useEffect} from "react";
import { AnimatePresence,motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from '../config/config'
import state from "../store";
import { download } from '../assets'
import { downloadCanvasToImage, reader } from "../config/helpers";
import {EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { AIPicker ,ColorPicker,FilePicker,CustomButton,Tab} from "../components";
const Customizer = () =>{
    const snap = useSnapshot(state);

    //定义几个状态
    const [file,setFile] = useState('');
    const [prompt,setPrompt] = useState('')
    const [generatingImg,setGeneratingImg] = useState('')

    const [activeEditorTab,setActiveEditorTab] = useState('')
    const [activeFilterTab,setActiveFilterTab] = useState({
        logoShirt:true,
        stylishShirt:false,
    })
    


    // 根据激活tab显示对应的内容
    const generateTabContent = () =>{
        switch(activeEditorTab){
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                file={file}
                setFile={setFile}
                readFile={readFile}
                
                />
            case "aipicker":
                return <AIPicker
                prompt={prompt}
                setPrompt={setPrompt}
                generatingImg={generatingImg}
                handleSubmit={handleSubmit}
                
                
                />


            default:
                return null;
        }

    }
    const handleSubmit = async (type) =>{
        if(!prompt) return alert("请输入您的口令");

        try {
            
        } catch (error) {
            alert(error)
        } finally{
            setGeneratingImg(false);
            setActiveEditorTab("")

        }
    }

    const handleDecals = (type,result) =>{
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;
        if(!activeFilterTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab)
        }

    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
          case "logoShirt":
              state.isLogoTexture = !activeFilterTab[tabName];
            break;
          case "stylishShirt":
              state.isFullTexture = !activeFilterTab[tabName];
            break;
          default:
            state.isLogoTexture = true;
            state.isFullTexture = false;
            break;
        }

        //更新ui
        setActiveFilterTab((prevState) =>{
            return{
                ...prevState,
                [tabName]:!prevState[tabName]
            }
        })
    }

    // 读取上传的文件
    const readFile = (type) => {
        reader(file)
          .then((result) =>{
            handleDecals(type,result);
            setActiveEditorTab("");
          })
    }
    return(
        <AnimatePresence>
            {!snap.intro &&(
                <>
                <motion.div
                key="custom"
                className="absolute top-0 left-0 z-10"
                {...slideAnimation('left')}
                >
                    <div className="flex items-center min-h-screen">
                        <div
                        className="editortabs-container tabs">
                            {EditorTabs.map((tab) => (
                                <Tab 
                                key={tab.name}
                                tab = {tab}
                                handleClick = {() => setActiveEditorTab(tab.name)}
                                
                                />
                            ))}

                            {generateTabContent()}
                        </div>
                    </div>

                </motion.div>
                <motion.div
                className="absolute z-10 top-5 right-5"
                {...fadeAnimation}
                
                >
                    <CustomButton
                    type="filled"
                    title="Go Back"
                    handleClick={() => state.intro = true}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    
                    />

                </motion.div>
                <motion.div
                className="filtertabs-container"
                {...slideAnimation('up')}>
                    {FilterTabs.map((tab) => (
                        <Tab
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                        
                        />
                    ))}

                </motion.div>
                
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer