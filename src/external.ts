

import axios from 'axios';

const parseQueryString = (input:string , obj = Object.create(null)) => 
decodeURI(input.slice(input.indexOf('?') + 1, 
input.length)).split('&').map(entry => [
  [entry.split('=')[0]],
  [entry.split('=')[1]]
]).reduce((obj, query) => (<any>Object).assign(obj, {
  [query[0][0]]: query[1][0]
}), {});


const qs = parseQueryString(window.location.search);

export let LOADED_DATASETS:any = { 'status' : 'use "url" query parameter to load a dataset list object like { datasets: [ { name: .. , url .. , id: .., description: .. , group: ... }, .. ]}',
                                   'datasets'  : []
                                   };

axios.get(qs['url']).then(response => { 

    LOADED_DATASETS = response.data;
    LOADED_DATASETS['url'] = qs['url'];
    LOADED_DATASETS['status'] = response.data.datasets.length + ' datasets loaded from ' + qs['url'];
    LOADED_DATASETS.datasets.forEach((dataset : any) => {
        dataset.url = new URL(dataset.url, qs['url']).href;
    });

});



export const EXTERNAL_DATASETS = [
{
  name: 'Barley' + qs['url'],
  description: 'Barley local yield by variety across the upper midwest in 1931 and 1932',
  url: 'http://localhost:18060/data/barley.json',
  id: 'barley',
  group: 'sample'
}, {
  name: 'Cars' + qs['url'],
  description: 'Automotive statistics for a variety of car models between 1970 & 1982',
  url: 'http://localhost:18060/data/cars.json',
  id: 'cars',
  group: 'sample'
}].map(dataset => {
  return {
    ...dataset,
    url: dataset.url
  };
});

