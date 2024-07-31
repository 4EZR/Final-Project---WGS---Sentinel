import React, { useState, useEffect } from 'react';
import { fetchRandomVerse } from '@/services/bibleService';

const Verse = () => {
    const [verseData, setVerseData] = useState(null);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                const verses = await fetchRandomVerse();
                setVerseData(verses[0]);
            } catch (error) {
                console.error('Error fetching Bible verse:', error);
            }
        };

        fetchVerse();
    }, []);

    useEffect(() => {
        if (verseData) {
            console.log(verseData);
        }
    }, [verseData]);

    return (
        <div>
            {verseData ? (
                <div>
                    <p><strong>{verseData.bookname} {verseData.chapter}:{verseData.verse}</strong></p>
                    <p>{verseData.text}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Verse;
