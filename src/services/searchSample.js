export default {
    search: (term, samples, opcInput) => {
        const cutSamples = samples.filter(item => containsString(item[opcInput], term));
        return cutSamples;
    }
}

function containsString(str, substr) {
    if (str != null || str != undefined) {
        const normalizeStr = normalizeString(str);
        const normalizeSubstr = normalizeString(substr);

        for (let i = 0; i < normalizeStr.length; i++) {
            if (normalizeStr.substring(i, i + normalizeSubstr.length) === normalizeSubstr) {
                return str;
            }
        }
        return false;
    }
    return false;
}

function normalizeString(str){
    return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "").replace(/\s+/g, "");
}