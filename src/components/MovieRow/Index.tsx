import React from "react";
import './MovieRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useState } from "react";

export default ({ title, items }: any) => {
    const [scrollX, setScrollX] = useState<number>(0)
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;

        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60           
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--listarea" >
                <div className="movieRow--left" onClick={handleLeftArrow}>
                    <NavigateBeforeIcon style={{fontSize: 50}}/>
                </div>
                <div className="movieRow--right" onClick={handleRightArrow}>
                    <NavigateNextIcon style={{fontSize: 50}} />
                </div>
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item: any, key: any) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}