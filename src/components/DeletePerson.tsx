import { ChangeEvent, useState } from "react";
import { Person } from "../models/Person";

interface Props {
  persons: Person[];
  onDelete: (id: number | null) => Promise<void>;
}

const DeletePerson = ({ persons, onDelete }: Props) => {
  const [personId, setPersonId] = useState<number | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPersonId(Number(e.target.value));
  };

  return (
    <>
      <select onChange={changeHandler}>
        <option value="DEFAULT">Wybierz osobę</option>
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
