import './App.css';
import React from 'react';

import data from './data/data_emip.json';
import Menu from "./Menu";
import Cards from "./Cards";

let indexMap = new Array(data.length + 10).fill(0);

// Language Options
let languages = {}

function initIndexMap() {
    for (let itr of data) {
        indexMap[itr.id] = data.indexOf(itr)
    }
}

function initMenuItems() {
    let langSet = new Set();
    for (let itr of data) {
        if (itr.experiment_language in languages)
            languages[itr.experiment_language].add(data.indexOf(itr));
        else
            languages[itr.experiment_language] = new Set()
        langSet.add(itr.experiment_language);
    }

    for (let str in languages) {
        languages[str] = Array.from(languages[str]);
    }
    // console.log(languages);
}

function getDataForIndex(index) {
    let idx = indexMap[index];
    return data[idx];
}

function init() {
    initIndexMap();
    initMenuItems();
    getDataForIndex(5);
}

init();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "Java",
            id: 0,
            index: 0
        };
        this.LoadDataFromMenu = this.LoadDataFromMenu.bind(this);
    }

    LoadDataFromMenu(value){
        this.setState((prev, current) => ({
            lang: value.lang,
            id: value.id,
            index: indexMap[value.id]
        }), () => {
            console.log("Parent state changed by Menu :", value, "index:", this.state.index);
        });
    }
    render() {
        return (
            <div>
                <Menu data={languages} mutateMenu={this.LoadDataFromMenu}/>
                <Cards data={data[this.state.index]}/>
            </div>
        );
    }
}

export default App;