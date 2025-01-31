import { ChangeEvent, FormEvent, useEffect, useState } from "react";
interface Superhero {
  name: string,
  superpower: string,
  humilityScore: number
}

interface Response {
  error: number,
  message: string
}

export default function Home() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [lastResponse, setLastResponse] = useState<Response>({error: 0, message: ""});
  const [formData, setFormData] = useState<Superhero>({
    name: '',
    superpower: '',
    humilityScore: 1
  });

  const fetchSuperheroes = () => {
    fetch('http://localhost:3001/superheroes')
    .then(response => response.json())
    .then((data) => {
      setSuperheroes(data);
    })
    .catch(error => console.error('Error while fetching superheroes', error))
  }

  const createSuperheroAPI = (superhero: Superhero) => {
    fetch('http://localhost:3001/superheroes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superhero)
    }).then(response => response.json())
    .then(data => {
      fetchSuperheroes();
      setLastResponse(data);
    });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    const newValue = name === 'humilityScore' ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.length <= 0) return;
    if (formData.superpower.length <= 0) return;
    if (formData.humilityScore <= 0 || formData.humilityScore > 10) return;
    createSuperheroAPI(formData);
  }

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  return (
    <div className = "font-serif flex justify-center items-center flex-col w-screen h-screen bg-gray-100">
      <div className = "bg-white shadow-lg w-3/4 min-h-[100px] border border-gray-300 rounded-md">
        <h1 className = "text-sm font-bold text-gray-950 text-center">List of Superheroes</h1>
          <div className = "border-solid border-black border-t-[2px]">
            <div className = "overflow-y-auto max-h-[200px]">
              <table className = "table-auto text-center min-w-full">
                <thead>
                  <tr>
                    <th className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">Name</th>
                    <th className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">Superpower</th>
                    <th className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">Humility Score</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    superheroes.map((hero) => (
                      <tr>
                        <td className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">{ hero.name }</td>
                        <td className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">{ hero.superpower }</td>
                        <td className = "text-sm font-medium text-gray-700 border-b border-gray-300 rounded-md">{ hero.humilityScore }</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      </div>
      <div className = "flex flex-col m-5 justify-center items-center w-3/4">
        <form className = "bg-white p-8 rounded-md shadow-lg w-96 space-y-4" onSubmit = {handleSubmit}>
          <div>
            <label className = "block text-sm font-medium text-gray-700" htmlFor = "name">Name: </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              type = "text"
              id = "name"
              name = "name"
              value = {formData.name}
              onChange = {handleChange}
            />
          </div>

          <div>
            <label className = "block text-sm font-medium text-gray-700" htmlFor = "superpower">Superpower: </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              type = "text"
              id = "superpower"
              name = "superpower"
              value = {formData.superpower}
              onChange = {handleChange}
            />
          </div>

          <div>
            <label className = "block text-sm font-medium text-gray-700" htmlFor = "humilityScore">Humility Score: </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              type = "number"
              id = "humilityScore"
              name = "humilityScore"
              value = {formData.humilityScore}
              onChange = {handleChange}
              min = {1}
              max = {10}
            />
          </div>

          <button 
            className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"

            type = "submit">
            Submit
          </button>
        </form>

        {lastResponse.error !== 0 ? `Error: ${lastResponse.message}` : ""}
      </div>
    </div>
  );
}
