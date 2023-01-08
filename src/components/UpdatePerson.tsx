import { ChangeEvent, FormEvent, useState } from "react";
import { Person } from "../models/Person";

interface Props {
  persons: Person[] | null;
  onUpdate: (person: Person) => void;
}

const UpdatePerson = ({ persons, onUpdate }: Props) => {
  const [person, setPerson] = useState<Person | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPerson(
      (prevPersonState) =>
        ({ ...prevPersonState, [e.target.name]: e.target.value } as Person)
    );
  };

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const curPerson = persons?.find(
      (person) => person.id === Number(e.target.value)
    );

    if (curPerson) setPerson(curPerson);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5555/api/person/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    const personData: Person = await response.json();
    onUpdate(personData);
  };

  return (
    <>
      <select onChange={changeHandler} defaultValue="DEFAULT">
        <option value="DEFAULT" disabled>
          Wybierz osobę
        </option>
        {persons &&
          persons.map((person) => (
            <option value={person.id} key={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
      </select>

      <form onSubmit={submitHandler}>
        <label>
          Imię: <br />
          <input
            type="text"
            name="firstName"
            value={person ? person.firstName : ""}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Nazwisko: <br />
          <input
            type="text"
            name="lastName"
            value={person ? person.lastName : ""}
            onChange={onChange}
          />
        </label>
        <button>Aktualizuj</button>
      </form>
    </>
  );
};

export default UpdatePerson;
