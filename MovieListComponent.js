import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";

//To fetch json values from the URL
function useFetch(url) {

const [movieList, setMovieList] = useState([]);
const [genre, setMovieGenreArray] = useState([]); 
const [year, setMovieYearArray]  = useState([]); 

	async function fetchDataFromUrl() {
      const response = await fetch(url);
      const jsonData = await response.json();

      setMovieList(jsonData);
      setMovieGenreArray(jsonData.map(({ genre }) => ({ label: genre, value: genre }))); 
      setMovieYearArray(jsonData.map(({ productionYear }) => ({ label: productionYear , value: productionYear  })));
     
    }

    useEffect(() => {
      fetchDataFromUrl();
    }, []); 
    return [movieList, genre, year];
  }
  
 const MovieListComponent = (props) => {
	const [movieList, genre, year] = useFetch(
		"https://sometimes-maybe-flaky-api.gdshive.io"
	  );

	//Remove duplicate values and sort the array 
	let uniqueMovieGenreArray = [...new Map(genre.map(eachVal =>[eachVal["label"], eachVal]).sort()).values()];
	let uniqueMovieYearArray = [...new Map(year.map(eachVal =>[eachVal["label"], eachVal]).sort()).values()];

	uniqueMovieGenreArray.unshift({ label: "All" , value: "All"  })
	uniqueMovieYearArray.unshift({ label: "All" , value: "All"  })

	const [newMovieList, setNewMovieList]  = React.useState([]);
	useEffect(() => {
		setNewMovieList(movieList)
	  }, [movieList]); 

	const [selectedYear, setSelectedYear] = React.useState('');
	const [selectedGenre, setSelectedGenre] = React.useState('');
	
	//event handler for Genre
	const handleGenreEventChange = (selectedGenre) =>{
		setSelectedGenre(selectedGenre);
		if(selectedGenre === "All"){
			setNewMovieList(movieList);
		}
		else{
		const updatedMovie = movieList.filter((movie, index) => {
			return selectedGenre === movie.genre 
		})
		setNewMovieList(updatedMovie);
		}
	}

	//Populate Genre dropdown
	const GenreDropDown = (props) => {
	 return (
	   <select
		 value={selectedGenre}
		 onChange={(event) => handleGenreEventChange(event.currentTarget.value)}
	   >
		 {props.genre.map(({ label, value }) => (
		   <option key={value} value={value}>
			 {label}
		   </option>
		 ))}
	   </select>
	 );
   }
  
   //event handler for Year
   const handleYearEventChange = (selectedYear) =>{
	setSelectedYear(selectedYear);
	if(selectedYear === "All"){
		setNewMovieList(movieList);
	}
	else{
		const updatedMovieList = movieList.filter((movie, index) => {
		 	return selectedYear == movie.productionYear 
		})
		setNewMovieList(updatedMovieList);	
	}
	}

	//Populate Year dropdown
	const YearDropDown = (props) => {
	  return (
		<select
		  value={selectedYear}
		  onChange={(event) => handleYearEventChange(event.currentTarget.value)}
		>
		  {props.year.map(({ label, value }) => (
			<option key={value} value={value}>
			  {label}
			</option>
		  ))}
		</select>
	  );
	}
	
	return (
		<React.Fragment>
			<div className='movie-app'>
			<header>
      			<div>Movie List</div>
      		</header>
      
      		<div className = "dropdownRow">
      			<GenreDropDown  genre={uniqueMovieGenreArray} />
      			<YearDropDown  year={uniqueMovieYearArray} />
      		</div>
     
     
      		<div className='movieGridrow'>
	  			{newMovieList && newMovieList.map((movie, index) => (
						<div className='image-container'  key={movie.name}  onClick={() =>{ props.history.push({
							pathname: '/MovieDetailPage',
							state: { selectedMovieData: movie }
						})}}>
							
							<img src={'../Images/movie.jpg'} height = "250px" width = "250px" style={{background:"white"}}></img>
                   			<div className='movieName'>{movie.name}</div>
						</div>

				))}	

			</div> 
			</div>
		</React.Fragment>
	);
	
};

export default withRouter(MovieListComponent);