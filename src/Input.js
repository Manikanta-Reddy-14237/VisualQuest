import react ,{useState} from 'react';
import './Styles.css';

export default function Input({onSubmit,onSent}){

  const [value,setvalue] = useState();

  function handleSubmit(e){
    e.preventDefault();
     setvalue(value);
      onSubmit(value);
      onSent();
      setvalue('');
  }

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setvalue(e.target.value)} />
        <button type="submit">Search</button>
    </form>
    );
}
