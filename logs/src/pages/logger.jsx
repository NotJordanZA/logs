function Log(){
    return(
        <>
            <form>
                <label for="datetime">Date and Time</label>
                <input placeholder="Date and Time" type="datetime-local" id="datetime"></input>
                <label for="duration">Duration</label>
                <input placeholder="Duration" type="time" id="duration"></input>
                <label for="poorate">Poo Quality</label>
                <input placeholder="0/5" type="number" id="poorate"></input>
                <label for="wiperate">Wipe Quality</label>
                <input placeholder="0/5" type="number" id="wiperate"></input>
                <label for="solidity">Liquid to Solid Spectrum</label>
                <input placeholder="0/5" type="number" id="solidity"></input>
                <label for="granularity">Granular to Log Spectrum</label>
                <input placeholder="0/5" type="number" id="granularity"></input>
            </form>
        </>
    )

}

export default Log;