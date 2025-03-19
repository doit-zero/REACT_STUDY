import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Create(props) {
  return <article>
    <form onSubmit={event =>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
    <h2>Create</h2>
      <p><input type="title" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function App() {

  const [mode, setMode] = useState('WELCOME');

  const [id, setId] = useState(null);

  const [nextId,setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);

  let content = null;

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(title,body)=>{
      const newTopic = {id:nextId,title:title,body:body}
      // 리액트는 원시 타입이 아닌 경우 복제 해야함
      const newTopics = [...topics];
      // 복제한 값에 새로운 토픽을 넣어서
      newTopics.push(newTopic);
      // 리액트는 기존의 배열과 새롭게 생성된 배열이 다름을 인지하여 렌더링이 됨
      setTopics(newTopics);

      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  }
  return (
      <div>
        <Header title="WEB" onChangeMode={()=>{
          setMode('WELCOME');
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
          setMode('READ');
          setId(_id);
        }}></Nav>
        {content}
        <a href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
        }}>Create</a>
      </div>
  );
}

export default App;