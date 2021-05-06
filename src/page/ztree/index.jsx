import React, { useState } from 'react'
import { Tree, Input, Modal } from 'antd'
import { treeData } from '../../common'
import EditIcon from '../../assets/img/edit.png'
import './index.scss'

// Tree 面试题
// 望面试官给年轻人个机会，机会我会努力争取的，我已尽力将代码保持整洁，谢谢你的阅读 
export default function ZtreeDemo(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [InputValue, setInputValue] = useState('')
    const [CurrentValue, setCurrentValue] = useState('')
    const [Data, setData] = useState(treeData || [])

    const handleOk = () => { //确认
        setIsModalVisible(false)
        if (CurrentValue != InputValue) {
            Data.forEach((item1) => { //第一级
                if (CurrentValue === item1.title) {
                    item1.title = InputValue
                    item1.key = InputValue
                }
                if (item1.children && item1.children.length > 0) {
                    item1.children.forEach((item2) => { //第二级
                        if (CurrentValue === item2.title) {
                            item2.title = InputValue
                            item2.key = InputValue
                        }
                        if (item2.children && item2.children.length > 0) {
                            item2.children.forEach((item3) => { //第二级
                                if (CurrentValue === item3.title) {
                                    item3.title = InputValue
                                    item3.key = InputValue
                                }
                            })
                        }
                    })
                }
            })
            setData(Data)
        }
    }

    const handleCancel = () => { //取消
        setIsModalVisible(false);
        setInputValue('')
    }

    const showModal = (e, value) => { //弹出Modal
        e.stopPropagation()
        setIsModalVisible(true)
        setInputValue('')
        setCurrentValue(value)
    }

    const input_arrow = (e) => { //change
        e.preventDefault()
        setInputValue(e.target.value)
    }

    const titleArrow = (data) => {
        return (
            <div className="styleTree">
                <div>
                    {data.title}
                </div>

                <img src={EditIcon} alt="" onClick={e => showModal(e, data.title)} />
            </div>
        )
    }

    return (
        <div className="ztree-demo">
            <Tree
                checkable={false}
                defaultExpandAll
                // showLine
                titleRender={(nodeData) => titleArrow(nodeData)}
                treeData={Data}
            />
            <Modal title={`修改当前节点数据(${CurrentValue})`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="请输入修改的内容" onChange={input_arrow} value={InputValue} onPressEnter={handleOk}/>
            </Modal>
        </div>
    )
}