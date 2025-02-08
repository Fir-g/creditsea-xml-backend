import xml2js from 'xml2js';

export const parseXMLFile = async (xmlData) => {
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);

    if (!result.INProfileResponse) {
        throw new Error('Invalid XML format: missing <INProfileResponse> root element.');
    }

    return result;
};