interface TitleFieldProps {
  title: string;
  setTitle: (title: string) => void;
}

interface DescriptionFieldProps {
  description: string;
  setDescription: (description: string) => void;
}

interface TaskFieldsProps extends TitleFieldProps, DescriptionFieldProps {
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

const TitleInput: React.FC<TitleFieldProps> = ({ title, setTitle }) => (
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    maxLength={30}
    className="w-full p-2 mb-4 border rounded-lg outline-none"
  />
);

const DescriptionInput: React.FC<DescriptionFieldProps> = ({
  description,
  setDescription,
}) => (
  <textarea
    placeholder="What you want to do?"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    maxLength={100} // Set max length for title
    className="w-full h-40 p-4 mb-4 border rounded-lg outline-none"
  />
);

const TaskFields: React.FC<TaskFieldsProps> = ({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  error,
}) => (
  <form onSubmit={handleSubmit}>
    {error && <p className="text-red-500">{error}</p>}
    <TitleInput title={title} setTitle={setTitle} />
    <DescriptionInput
      description={description}
      setDescription={setDescription}
    />
    <button type="submit" className="button">
      Submit
    </button>
  </form>
);

export default TaskFields;
