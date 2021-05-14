import axios from "axios";
import { useEffect, useState } from "react";
import './custom.scss';

function App() {

  //here we initialize the state
  const [users, setUseres] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get("https://reqres.in/api/users");
      setUseres(response.data.data);
    };
    loadUsers();
  }, []);
  //to put the suggestion in the input field
  const onSuggestHandler =(text) => {
    setText(text);
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matchs = []
    if(text.length > 0){
      matchs = users.filter(user =>{
        const regex = new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    //here to pass the filter results
    setSuggestions(matchs)
    //to update the text by the user input
    setText(text);
   
  };

  return (
    <div className="container">
    
      <input className="col-md-12 input" style={{marginTop:20}}
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        onBlur={()=>{
          setTimeout(()=>{
            setSuggestions([])
          },100);
        }}
        value={text}
      />

      {suggestions && suggestions.map((suggestion, i) =>
      <div key={i} className="suggetion col-md-12 justify-content-md-center"
      onClick={()=> onSuggestHandler(suggestion.email)}> 
      {suggestion.email} </div>
      )}  
    </div>
  );
}

export default App;
