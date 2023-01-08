import { Person } from "../models/Person";

interface Props {
  person: Person;
}

const PersonListItem = ({ person }: Props) => {
  return (
    <li>
      {person.firstName} {person.lastName}
    </li>
  );
};

export default PersonListItem;
