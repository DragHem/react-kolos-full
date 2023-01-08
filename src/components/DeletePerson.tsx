import { ChangeEvent, useState } from "react";
import { Person } from "../models/Person";

interface Props {
  persons: Person[];
  onDelete: (id: number) => Promise<void>;
}

const DeletePerson = ({ persons, onDelete }: Props) => {
  const [personId, setPersonId] = useState<number>(persons[0].id);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPersonId(Number(e.target.value));
  };

  return (
    <>
      <select onChange={changeHandler}>
        {persons &&
          persons.map((person) => (
            <option value={person.id} key={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
      </select>
      <button onClick={() => onDelete(personId)}>Usuń</button>
    </>
  );
};

export default DeletePerson;
