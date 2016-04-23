namespace ehtml
{
	static string ehtml();
	vector<string> explode(const string& str, const char& ch);
}

namespace ehtml
{
	vector<string> explode(const string& str, const char& ch) {
		string next;
		vector<string> result;
		// For each character in the string
		for (string::const_iterator it = str.begin(); it != str.end(); it++) {
			// If we've hit the terminal character
			if (*it == ch) {
				// If we have some characters accumulated
				if (!next.empty()) {
					// Add them to the result vector
					result.push_back(next);
					next.clear();
				}
				} else {
				// Accumulate the next character into the sequence
				next += *it;
			}
		}
		if (!next.empty())
		result.push_back(next);
		return result;
	}
	string ehtml(string str){
		vector<string> structs = explode(str, ' ');
		string s;
		int levels[500];
		
		/*for(int i=0;i<structs.size();i++){
			s = structs[i];
			if(s == "");
			else if(s == '>'){
				levels[levels.size()] = -1;
			}
			else if(s == '^'){
				
			}
			else if(s == '<'){
				
			}
		}*/
	}
}