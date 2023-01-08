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

  const onDelete = async (personId: number | null): Promise<void> => {
    if (personId) {
      const response = await fetch(
        `http://localhost:5555/api/person/${personId}`
      );

      if (response.ok) {
        const newPersonList = personList?.filter(
          (person) => person.id !== personId
        );

        if (newPersonList) {
          setPersonList(newPersonList);
          return;
        }

        setPersonList([]);
      }
    }
  };

  const addPerson = (person: Person): void => {
    setPersonList((prevPresons) => [...prevPresons, person]);
  };

  const updatePerson = (person: Person): void => {
    const newPersonList = [...personList];

    const index = newPersonList.findIndex((p) => p.id === person.id);

    newPersonList.splice(index, 1, person);

    setPersonList(newPersonList);
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
