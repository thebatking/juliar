#include <iostream>
#include <string>
#include <stack>
#include <stdexcept>
#include <algorithm>
#include <cctype>

using namespace std;

#include "math.cpp"
#include "web.cpp"

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

string add(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		total += stoi(num[i]);
	}
	return to_string(total);
}

string subtract(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) total = stoi(num[i]);
		else total -= stoi(num[i]);
	}
	return to_string(total);
}

string divide(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) total = stoi(num[i]);
		else total /= stoi(num[i]);
	}
	return to_string(total);
}

string multiply(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) total = stoi(num[i]);
		else total *= stoi(num[i]);
	}
	return to_string(total);
}

//Knuth Optimized
int myPow(int x, int p)
{
  if (p == 0) return 1;
  if (p == 1) return x;

  int tmp = myPow(x, p/2);
  if (p%2 == 0) return tmp * tmp;
  else return x * tmp * tmp;
}

string power(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) total = stoi(num[i]);
		else total = myPow(total,stoi(num[i]));
	}
	return to_string(total);
}

string remainder(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	int total = 0;
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) total = stoi(num[i]);
		else total %= stoi(num[i]);
	}
	return to_string(total);
}

string equalto(string s){
	vector<string> num = explode(s,' ');
	vector<string>::iterator it;
	string compared = "";
	int i =0;
	for(it=num.begin() ; it < num.end(); it++,i++) {
		if(i == 0) compared = num[i];
		else if(compared.compare(num[i]) != 0) return "false"; 
	}
	return "true";
}

string picker(string s = ""){
	vector<string> temp = explode(s, ' ');
	int length = temp[0].size();
	vector<string> result = explode(temp[0], '=');
	string command = result[0];
	
	vector<string> args;
	if(result.size() > 1){
		 args = explode(result[1], ',');
	}
	
	if(command == "add") return add(s.substr(length));
	if(command == "subtract") return subtract(s.substr(length));
	if(command == "divide") return subtract(s.substr(length));
	if(command == "multiply") return multiply(s.substr(length));
	if(command == "power") return power(s.substr(length));
	if(command == "remainder") return remainder(s.substr(length));
	if(command == "equalto") return equalto(s.substr(length));
	return "";
}

string parser(string s = ""){
	int currentindex = 0;
	int nextvalue;
	int lastindex = 0;
	stack<int> positions;
	string oldstring;
	while((currentindex = s.find("*",currentindex)) != -1){
		nextvalue = s[currentindex+1];
		if('\\' == s[currentindex-1]);
		else if (!(nextvalue == 32 || nextvalue == 42 || nextvalue == 46 || nextvalue == 9 || nextvalue == 10 || nextvalue == 13)) {
			positions.push(currentindex);
		}
		else{
			
			//if(positions.empty()) throw invalid_argument("Code has an extra * Position: " + (currentindex+1));
			if(positions.empty()) return "Code has an extra * Position: " + to_string(currentindex+1);
			lastindex = positions.top();
			positions.pop();
			oldstring = s.substr(lastindex,(currentindex-lastindex+1));
			s = s.substr(0,lastindex) + picker(oldstring.substr(1,oldstring.size()-2)) + s.substr(currentindex+1);
			currentindex = lastindex-1;
		}
		++currentindex;
	}
	//if(!positions.empty()) throw invalid_argument("Code is not properly closed # of missing * : "+positions.size());
	if(!positions.empty()) return "Code is not properly closed # of missing * : "+to_string(positions.size());
	ReplaceStringInPlace(s,"\\*","*");
	return s;
}

int main(void){
	string input;
	string buffer;
	while (getline(cin,input)) {
		buffer += input + "\r\n";
	}
	cout << parser(buffer);
	return 0;
}