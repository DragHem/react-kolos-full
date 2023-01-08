import { ChangeEvent, FormEvent, useState } from "react";
import { Person } from "../models/Person";

interface Props {
  addPerson: (person: Person) => void;
}

const CreatePerson = ({ addPerson }: Props) => {
  //Metoda 1
  const [person, setPerson] = useState<Person>({
    lastName: "",
    firstName: "",
    id: 0,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPerson(
      (prevPersonState) =>
        ({ ...prevPersonState, [e.target.name]: e.target.value } as Person)
    );
  };

  const onSubmit1 = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5555/api/person/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    const personData: Person = await response.json();

    addPerson(personData);
  };

  //Metoda 2
  const [personName, setPersonName] = useState<string>("");
  const [personLastName, setPersonLastName] = useState<string>("");

  const onSubmit2 = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5555/api/person/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        firstName: personName,
        lastName: personLastName,
      }),
    });

    const personData: Person = await response.json();

    addPerson(personData);
  };

  return (
    <>
      <form onSubmit={onSubmit1}>
        Metoda 1 <br />
        <label>
          Imię: <br />
          <input
            type="text"
            name="firstName"
            value={person.firstName}
            onChange={onChange}
          />
        </label>
        <br />
        <label>
          Nazwisko: <br />
          <input
            type="text"
            name="lastName"
            value={person.lastName}
            onChange={onChange}
          />
        </label>
        <button>Dodaj</button>
      </form>
      <br />
      <form onSubmit={onSubmit2}>
        Metoda 2 <br />
        <label>
          Imię: <br />
          <input
            type="text"
            name="firstName"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nazwisko: <br />
          <input
            type="text"
            name="lastName"
            value={personLastName}
            onChange={(e) => setPersonLastName(e.target.value)}
          />
        </label>
        <button type="submit">Dodaj</button>
      </form>
    </>
  );
};

export default CreatePerson;
