const STARTED_CODING = new Date("2019-05-18");
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function YearsCoding() {
	const years = (Date.now() - STARTED_CODING.getTime()) / MS_PER_YEAR;
	return <>{Math.floor(years)}</>;
}
