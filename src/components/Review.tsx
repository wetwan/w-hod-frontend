
type Props = {
  name: string;
  email: string;
  review: string;
};

const Review = ({ name, email, review }: Props) => {
  return (
    <div className="border rounded-md border-green-600 px-3 py-4 mb-3">
      <div className="md:w-5/6 mx-auto flex items-center justify-between">
        <p className="p-2 border clip border-blue-500 capitalize">{name}</p>
        <p className="p-2 border clip border-blue-500">{email}</p>
      </div>
      <div className="md:w-5/6 mx-auto mt-5 border-color p-2">
        <p className="w-full "> {review}</p> 
      </div>
     
    </div>
  );
};

export default Review;
