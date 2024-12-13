const { labels, modLabels } = require("/res/dictionaries")

const Autocomplete = ({type, lookFor, nameAs})=>{
    return <>
        <label htmlFor={nameAs}>{labels[type == "transaction" ? "receipt" : type + "s"][nameAs] || modLabels[type][nameAs]}</label>
        <input type="text" name={nameAs} id={nameAs} />
        
    </>
}
export default Autocomplete;