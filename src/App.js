import React, { useState, useEffect } from 'react';
import Input from './Input';
import './Styles.css';

export default function App() {
  const [svalue, setsvalue] = useState('');
  const [defaultData, setDefaultData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [defaultPage, setDefaultPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [ischecked, setischecked] = useState(true);


 function edge(){
  setischecked(false);
  setDefaultData([]);
  setSearchPage(1);
}

const handleDownload = (photoUrl, photoName) => {
  const link = document.createElement('a');
  link.href = photoUrl;
  link.download = photoName;
  link.click();
};

  async function search(value) {
    if (value && value.length !== 0) {
      setsvalue((prevValue) => value);
    }
    try { 
      var link = `https://api.unsplash.com/search/collections?client_id=wZyX56wxccatXRhbdYPVwtMl3r2PXZs28wRPJmr93LQ&page=${searchPage}&per_page=30&query=${svalue}`;
      var response = await fetch(link);
      var datas = await response.json();
      setSearchData(datas.results);
      console.log(datas);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  }

  async function renderdyn() {
    try {
      var link = `https://api.unsplash.com/photos/?client_id=wZyX56wxccatXRhbdYPVwtMl3r2PXZs28wRPJmr93LQ&page=${defaultPage}&per_page=30&auto=format`;
      var response = await fetch(link);
      var datas = await response.json();
      setDefaultData(datas);
      console.log(datas);
    } catch (err) {
      console.error('Error fetching default images:', err);
      // Handle errors, e.g., display an error message to the user
    }
  }

  useEffect(() => {

  console.log('ischecked:', ischecked);
  console.log('defaultPage:', defaultPage);
  console.log('searchPage:', searchPage);
  console.log('svalue:', svalue);

    if (ischecked) {
      renderdyn();
    } else {
      search();
    }
  }, [defaultPage, searchPage, ischecked, svalue]);

  function handlenext() {
    if (ischecked) {
      setDefaultPage((prevpage) => prevpage + 1);
    } else {
      setSearchPage((prevpage) => prevpage + 1);
    }
  }

  function handleprev() {
    if (ischecked) {
      if (defaultPage > 1) {
        setDefaultPage((prevpage) => prevpage - 1);
      }
    } else {
      if (searchPage > 1) {
        setSearchPage((prevpage) => prevpage - 1);
      }
    }
  }

  const datalist = (
    <>
      {ischecked ? (
        // Display default images
        <div className='image-container'>
          {defaultData.map((item) => (
            <p key={item.id} className='image'>
            <img src={item.urls?.regular} alt={item.slug} className='image' onClick={() => handleDownload(item.links.download, item.slug)} />
            </p>
          ))}
        </div>
      ) : (
        // Display search results
        <div className='image-container'>
          {searchData.map((item) => (
            <p key={item.cover_photo.id} className='image'>
              <img src={item.preview_photos[0]?.urls?.regular} alt={item.cover_photo.alt_description} className='image' onClick={() => handleDownload(item.links.html, item.cover_photo.slug)} />
            </p>
          ))}
        </div>
      )}
      <div className='button-container'>
        <button onClick={handleprev} className='pagenation'>
          Prev
        </button>
        <button onClick={handlenext} className='pagenation'>
          Next
        </button>
      </div>
    </>
  );

  return (
    <>
      <Input onSubmit={search} onSent={edge}/>
      {datalist && <div>{datalist}</div>}
    </>
  );
}

