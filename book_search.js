/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": "",
        "Results": []
    };
    spaced_searchTerm = searchTerm + " ";

    var title = scannedTextObj[0];
    
    for ( let i =0; i<title.Content.length; i++) //i is the number of text strings in question, goes through all text conent sections
    {
        let text = title.Content[i].Text;

        let ISBN = title.ISBN;
        let Page = title.Content[i].Page;
        let line = title.Content[i].Line;

        for(let j =0; j<text.length; j++) // j is the length of the string in question, oes through each text content 
        {
            result.SearchTerm = searchTerm;
            if(text.charAt(j) == spaced_searchTerm.charAt(0)) //If first letter of text in question equals first letter of search term 
            {
                let b = j+1; //b will iterate through the word in question
                let c = 1; //c will iterate through the search term 
                var word_end = false;

                while(!word_end) // finds the end of the word
                {
                    if(text.charAt(b) ==  spaced_searchTerm.charAt(c)) //If the letters after the first match (b) == the letters after the first index of the search term (c)
                    {
                        b++;
                        c++;
                    }
                    else
                    {
                        if(c > 1 && text.charAt(b+1)!=spaced_searchTerm.charAt(c))
                        {
                            console.log(text.charAt(b));
                            if((text.charAt(b-1) == " " && text.charAt(j-1) == " ") || text.charAt(b) =="-")
                            {
                                let end_result = {
                                    "ISBN":ISBN,
                                    "Page":Page,
                                    "Line":line
                                }
                                result.Results.push(end_result); 
                            }
                        }
                        word_end = true;
                    }
                }

            }
        }
    }
    // console.log(result);
    
    
    return result;

    //Iterate through the object to locate each Content texts area
    //Within each content text, iterate through charcter by character using two pointers to find a match of the searchTerm
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on a bay part by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
//This is a Positive Test
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

const twentyLeaguesOut2 = {
    "SearchTerm": "pro",
    "Results": []
}

//This is a Negative test not finding the exact word 'pro'
const test3result = findSearchTermInBooks("pro", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesOut2) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut2);
    console.log("Received:", test3result);
}

const twentyLeaguesOut3 = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

//This is a Case-sensitive test finding the exact word 'The' but not 'the'
const test4result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesOut3) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut3);
    console.log("Received:", test4result);
}

const twentyLeaguesOut4 = {
    "SearchTerm": "dark",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

//A final test to test the hypenated section
const test5result = findSearchTermInBooks("dark", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesOut4) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOut4);
    console.log("Received:", test5result);
}
