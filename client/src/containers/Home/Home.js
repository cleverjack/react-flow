import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTempFlow, submitTempNewFlow } from '../../store/actions/flowsActions';
import Article from '../../components/Article/Article';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';
import ReactFlow from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFolderOpen, faSave, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { label: 'Python Script' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 150, y: 350 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

const Home = (props) => {
    const [flow, setFlow] = useState(elements)

    useEffect(() => {
        props.getTempFlow()
    }, [])

    useEffect(() => {
        if (props.flow && props.flow.data) {
            console.log(props.flow.data)

            props.flow.data.map(item => {
                if (item.data && typeof item.data.label !== "string") {
                    item.data.label = React.createElement(item.data.label.type, item.data.label.props, item.data.label.props.children)
                }
            })

            setFlow(props.flow.data)
        } else {
            setFlow(elements)
        }
    }, [props.flow])

    const saveFlow = () => {
        console.log(flow)
        props.submitTempNewFlow({data: flow})
    }

    return (
        <div className="flow-page">
            <div className="page-layout">
                <div className="header">
                    <div style={{height: '30px'}}>

                    </div>
                    <div className="px-3">
                        <FontAwesomeIcon icon={faPlus} className="text-white mx-2 cursor-pointer"/>
                        <FontAwesomeIcon icon={faFolderOpen} className="text-white mx-2 cursor-pointer"/>
                        <FontAwesomeIcon icon={faSave} className="text-white mx-2 cursor-pointer" onClick={saveFlow}/>
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-white mx-2 cursor-pointer"/>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="left-side-panel">
                        <div className="d-flex bg-header text-white text-uppercase text-sm">
                            <p className="flex-1 text-center mb-0 py-2 cs-border-bottom">Activities</p>
                            <p className="flex-1 text-center mb-0 py-2 cs-border-bottom">Elements</p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="flow-content">
                            <ReactFlow elements={flow} />
                        </div>
                        <div className="console-panel rounded-t overflow-hidden">
                            <div className="bg-header text-white rounded-t px-3 py-1">
                                Console
                            </div>
                        </div>
                    </div>
                    <div className="right-side-panel">
                        <div className="d-flex bg-header text-white text-uppercase text-sm">
                            <p className="flex-1 text-center mb-0 py-2 cs-border-bottom">Properties</p>
                            <p className="flex-1 text-center mb-0 py-2 cs-border-bottom">Variables</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        flow: state.flows.flow,
        myArticles: state.articles.myArticles,
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitTempNewFlow: (flowData) => dispatch(submitTempNewFlow(flowData)),
        getTempFlow: () => dispatch(getTempFlow())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
