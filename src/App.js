import React, {useState} from 'react';
import "./App.css";

var currentDate = new Date();

function DateTimePretty(Component, data){
  let date = new Date(data)
  let dif = (currentDate - date) / 60000;
  let title = '';
  if(dif < 60){
    title = Math.floor(dif) + " минут назад";
  }
  if(dif < 3600){
    title = Math.floor(dif/60) + " часов назад";
  }
  title = Math.floor(dif/1440)+ " дней назад";
  return <Component date={title}/>
}

function VideoBlock(props){
    return (
        <div className={props.style}>
            {props.children}
        </div>
    )
}

function Popular(props){
    return (
        <VideoBlock style="conteiner__popular-video">
            {props.children}
        </VideoBlock>
    )
}

function News(props){
    return (
        <VideoBlock style="conteiner__new-video">
            <>
                {props.children}
                <div className='hidden-video-banner'>
                    {props.title.length < 50?props.title:(props.title.slice(0, 50)+"...")}
                </div>
            </>
        </VideoBlock>
    )
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function VideoPretty(Component, {date, url, title, count}){
    if(count < 100){
        return (
            <Popular>
                <Component date={date} url={url}/>
            </Popular>
        )
    }
    return (
        <News title={title}>
            <Component date={date} url={url}/>
        </News>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            {DateTimePretty(DateTime, props.date)}
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item =>   VideoPretty(Video, item))
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00',
            count: 101,
            title: "Даешь революцию! Применяем Ухо горло нос : быстро, недорого, безопасно"
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00',
            count: 1010,
            title: "Ваш секретный чек-лист о Ночь улица фонарь"
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00',
            count: 1,
            title: "Какая же гадость — вот что увеличивает продажи на 27%"
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00',
            count: 10,
            title: "Народный мститель зубами прокусывал колёса у дорогих автомобилей"
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00',
            count: 10101,
            title: "Обычный молоток может стать причиной ранней импотенции"
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00',
            count: 101010,
            title: "В Израиле задержали банду торговцев салом"
        },
    ]);

    return (
        <VideoList list={list} />
    );
}