import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        Home
        <Link to="/contact">Contact</Link>
    </div>
  )
}

export default Home