import { Person } from "../models/Person";
import PersonListItem from "./PersonListItem";

interface Props {
  persons: Person[] | null;
}

const PersonList = ({ persons }: Props) => {
  return (
    <ul>
      {persons &&
        persons.map((person) => (
          <PersonListItem key={person.id} person={person} />
        ))}
    </ul>
  );
};

export default PersonList;
