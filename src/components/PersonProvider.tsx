import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import CreatePerson from "./CreatePerson";
import DeletePerson from "./DeletePerson";
import PersonList from "./PersonList";
import UpdatePerson from "./UpdatePerson";

const PersonProvider = () => {
  const [personList, setPersonList] = useState<Person[] | []>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5555/api/person");

      const personData: Person[] = await response.json();

      setPersonList(personData);
    })();
  }, []);

  const onDelete = async (personId: number): Promise<void> => {
    if (personId) {
      const response = await fetch(
        `http://localhost:5555/api/person/${personId}`
      );

      if (response.ok) {
        setPersonList((prevPersonList) =>
          prevPersonList.filter((person) => person.id !== personId)
        );
      }
    }
  };

  const addPerson = (person: Person): void => {
    setPersonList((prevPresons) => [...prevPresons, person]);
  };

  const updatePerson = (person: Person): void => {
    const index = personList.findIndex((p) => p.id === person.id);

    setPersonList((prevPersonList) => prevPersonList.splice(index, 1, person));
  };

  return (
    <>
      <PersonList persons={personList} />
      <br />
      Delete
      <hr />
      <DeletePerson persons={personList} onDelete={onDelete} />
      <br />
      Create
      <hr />
      <CreatePerson addPerson={addPerson} />
      <br />
      Update
      <hr />
      <UpdatePerson persons={personList} onUpdate={updatePerson} />
    </>
  );
};

export default PersonProvider;
