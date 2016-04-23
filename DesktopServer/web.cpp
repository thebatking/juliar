#include <ctime>
#include <algorithm> 
#include <functional> 
#include <cctype>
#include <locale>
#include "ehtml.cpp"


namespace web{
	void ReplaceStringInPlace(std::string& subject, const std::string& search,const std::string& replace);
	string code(string);
	string javascript(string);
	string symbol(string);
	string capitalize(string);
	string date(void);
	string time(void);
	string title(string);
	string subtitle(string);
	string author(string);
	string header(string);
	string footer(string);
	string globalbackground(string);
}

namespace web{
	static inline std::string &ltrim(std::string &s) {
        s.erase(s.begin(), std::find_if(s.begin(), s.end(), std::not1(std::ptr_fun<int, int>(std::isspace))));
        return s;
	}

	// trim from end
	static inline std::string &rtrim(std::string &s) {
		s.erase(std::find_if(s.rbegin(), s.rend(), std::not1(std::ptr_fun<int, int>(std::isspace))).base(), s.end());
		return s;
	}

	// trim from both ends
	static inline std::string &trim(std::string &s) {
		return ltrim(rtrim(s));
	}
	void ReplaceStringInPlace(std::string& subject, const std::string& search,const std::string& replace) {
		size_t pos = 0;
		while((pos = subject.find(search, pos)) != std::string::npos) {
			subject.replace(pos, search.length(), replace);
			pos += replace.length();
		}
	}
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
	
	string code(string str){
		ReplaceStringInPlace(str,"&","&amp;");
		ReplaceStringInPlace(str,"<","&lt;");
		ReplaceStringInPlace(str,">","&gt;");
		return str;
	}
	
	string javascript(string str){
		vector<string> arr = explode(str, ' ');
		if(arr[0].find(".js") != std::string::npos){
			return "<script src='"+str+"'></script>";	
		}
		return "<script>"+str+"</script>";
	}
	
	string symbol(string nameOfSymbol){
		if(nameOfSymbol.compare("sigma") == 0) return "&Sigma;";
		else if(nameOfSymbol.compare("delta") == 0) return "&Delta;";
		else if(nameOfSymbol.compare("integral") == 0) return "&#8747;";
		else if(nameOfSymbol.compare("plusminus") == 0) return "&plusmn;";
		else if(nameOfSymbol.compare("leftright") == 0) return "&harr;";
		else if(nameOfSymbol.compare("up") == 0) return "&uarr;";
		else if(nameOfSymbol.compare("down") == 0) return "&darr;";
		else if(nameOfSymbol.compare("left") == 0) return "&larr;";
		else if(nameOfSymbol.compare("right") == 0) return "&rarr;";
		else if(nameOfSymbol.compare("doubleleftright") == 0) return "&hArr;";
		else if(nameOfSymbol.compare("doubleup") == 0) return "&uArr;";
		else if(nameOfSymbol.compare("doubledown") == 0) return "&dArr;";
		else if(nameOfSymbol.compare("doubleleft") == 0) return "&lArr;";
		else if(nameOfSymbol.compare("doubleright") == 0) return "&rArr;";	
		else return "unknown";
	}
	
	string capitalize(string sentence){
		bool cap_it = true;
		for (int i = 0; i < sentence.size(); i++)
		{
			if (isalpha(sentence[i]) && cap_it == true)
			{
				sentence[i] = toupper(sentence[i]);
				cap_it = false;
			}
			else if (isspace (sentence[i])) cap_it = true;
		}
		return sentence;
	}
	
	string date(void){
		//time_t t = time();   // get time now
		//struct tm * now = localtime( & t );
		//return to_string(now->tm_mon + 1) + "/" + to_string(now->tm_mday) + "/" + to_string(now->tm_year + 1900);
		return "Not Implemented";
	}
	
	string time(void){
		//time_t t = time();   // get time now
		//struct tm * now = localtime( & t );
		//return asctime(now);
		return "Not Implemented";
	}
	
	string title(string s){
		return "<h1 style='text-align:center'>"+s+"</h1>";
	}
	string subtitle(string s){
		return "<h2 style='color:#557FBB'>"+s+"</h2>";
	}
	
	string author(string s){
		return "<h2 style='text-align:center'>"+s+"</h2>";
	}
	string header(string s){
		return "<span class=\"header\">"+s+"</span>";
	}
	
	string footer(string s){
		return "<span class=\"footer\">"+s+"</span>";
	}
	
	string globalbackground(string str){
		string s = trim(str);
		
		if(s.find(".") != string::npos || s.find("/") != string::npos){
			return "<style>body{background-image: url("+s+");}</style>";
		}else{
			vector<string> structs = explode(str, ' ');
		return (structs.size() == 2)? "<style>body{background = \"linear-gradient(to left top, "+structs[1]+", "+structs[0]+") fixed\"}</style>" : "<style>body{background:'"+str+"'}</style>";
		}
		return str;
	}
	
}