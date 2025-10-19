import React from "react";
import { useParams } from "react-router";
import { useTeams } from "./context/teamContext";
interface Props {}
// const handleClick = async () => {
//   const response = await fetch("https://total-task-backend.onrender.com/team", {
//     method: "GET",
//     credentials: "include", // 👈 crucial
//   });
//   console.log(await response.json());
// };
const Demo = (props: Props) => {
  const {teams , loadingTeams}= useTeams()
  const {productId} =useParams();
  const handleClick= ()=>{
    console.log(teams)
  }
  if(loadingTeams){
    return <div>Loading....</div>
  }
  return (
    <div>
      HI your id is {productId}
      <button onClick={() => handleClick()}>Click it</button>
    </div>
  );
};

export default Demo;
