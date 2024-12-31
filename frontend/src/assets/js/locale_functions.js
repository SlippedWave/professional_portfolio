const getJsonFile = async (file_category, locale) => {
    try {
        const module = await import(
            `../data/${file_category}/${file_category}_${locale}.json`
        );
        return module.default;
    } catch (error) {
        const fallback = await import(
            `../data/${file_category}_en.json`
        );
        return fallback.default;
    }
};

export default getJsonFile;
