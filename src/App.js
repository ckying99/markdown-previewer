import './App.css';
import React, {Component} from 'react';
import {FiCodesandbox} from "react-icons/fi"
import {BsArrowsFullscreen} from "react-icons/bs";
import {MdOutlineCloseFullscreen} from 'react-icons/md'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const firstText = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n~~~js\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n\tif (firstLine == '```' && lastLine == '```') {\n\t\treturn multiLineCode;\n\t}\n\t\n}\n~~~\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n\t- Some are bulleted.\n\t\t- With different indentation levels.\n\t\t\t- That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: firstText,
      previewExpandClick: false,
      editorExpandClick: false,
      displayEditor: true,
      displayPreview: true
    }
    this.onChange = this.onChange.bind(this);
    this.editorHandleClick = this.editorHandleClick.bind(this);
    this.previewerHandleClick = this.previewerHandleClick.bind(this);
  }

  editorHandleClick(){
    this.setState({
      editorExpandClick: !this.state.editorExpandClick,
      displayPreview : !this.state.displayPreview

    })
  }

  previewerHandleClick(){
    this.setState({
      previewExpandClick: !this.state.previewExpandClick,
      displayEditor: !this.state.displayEditor
    })
  }

  onChange(event){
    this.setState({
      text: event.target.value
    })
  }

  render(){
    console.log(this.state.editorExpandClick,this.state.previewExpandClick)

    return ( 
      <div >
        { 
          this.state.displayEditor ? <div className='container' style={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor: '#000044',
          }} >
            <div class='toolbar' style={{
          display: 'flex',
          textAlign:'left',
          borderColor: 'black',
          backgroundColor: 'blueviolet',
          width: '50%',
          margin: 0,
          borderWidth: '2px',
          boxShadow: '0 0 15px #888888',
          boxSizing: 'border-box',
          padding: '10px 0',
        }}>
          <FiCodesandbox style={{
            paddingLeft: '7px'
          }}
          />
          <b style={{
            paddingLeft: '7px'
          }}>Editor</b>
           {!this.state.editorExpandClick ? <BsArrowsFullscreen onClick={this.editorHandleClick} style={{ marginLeft:'auto',
              paddingRight: '10px' 
            }}> 
          </BsArrowsFullscreen>
              : <MdOutlineCloseFullscreen onClick={this.editorHandleClick} style={{ marginLeft:'auto',
              paddingRight: '10px'
            }}> 
          </MdOutlineCloseFullscreen>}
          </div>

        <textarea onChange={this.onChange} style={{
          whiteSpace: 'pre-wrap',
          display: 'flex',
          flexDirection:'column',
          width: '50%',
          height: this.state.displayPreview === true ? '300px':'auto',
          minHeight: this.state.displayPreview === true ? '300px':'100vh',
          background: '#999',
          overflowX : 'hidden',
          overflowY: 'auto',
          backgroundColor: '#C495EE',
          boxSizing: 'border-box',
          padding: '10px',
          resize: 'vertical',
          boxShadow: '0 0 10px #888888',
          outline: '0px solid transparent',
          border: 'none'

        }}>
          {this.state.text}
        </textarea>
        <div style={{
          padding: '15px',
          }}>
        </div>
          </div>:<div></div>
        }

        {
          this.state.displayPreview ? <div className='container' style={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor: '#000044',
          }} >
            <div class='toolbar' style={{
          display: 'flex',
          textAlign:'left',
          borderColor: 'black',
          backgroundColor: 'blueviolet',
          width: '65%',
          margin: 0,
          borderWidth: '2px',
          boxShadow: '0 0 15px #888888',
          boxSizing: 'border-box',
          padding: '10px 0',
        }}>
          
          <FiCodesandbox style={{
            paddingLeft: '7px'
            }}/>

          <b style={{   
            paddingLeft: '7px'
            }}>Previewer
          </b>
          {!this.state.previewExpandClick ? <BsArrowsFullscreen onClick={this.previewerHandleClick} style={{ marginLeft:'auto',
              paddingRight: '10px' 
            }}> 
          </BsArrowsFullscreen>
              : <MdOutlineCloseFullscreen onClick={this.previewerHandleClick} style={{ marginLeft:'auto',
              paddingRight: '10px'
            }}> 
          </MdOutlineCloseFullscreen>}

          </div>
        <div style={{
          whiteSpace: 'pre-wrap',
          display: 'flex',
          flexDirection:'column',
          width: '65%',
          height: 'auto',
          background: '#999',
          backgroundColor: '#C495EE',
          boxSizing: 'border-box',
          padding: '10px',
          resize: 'vertical',
          boxShadow: '0 0 10px #888888'
        }} >
            <ReactMarkdown
    children={this.state.text}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}
  />,
        </div>
        <div style={{
          padding: '20px'
        }}>

        </div>
          </div>: <div></div>
        }
        
      </div>  
  );
  }
}

export default App;
