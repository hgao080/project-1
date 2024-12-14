import { useParams } from "react-router-dom";

const CompetitionTest = () => {
    const { competitionId } = useParams()

    return (
        <div className="">
            <h1 className="">{competitionId}</h1>
        </div>
    );
}
 
export default CompetitionTest;