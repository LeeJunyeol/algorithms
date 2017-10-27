package bruteforce;

import java.util.Arrays;
import java.util.Scanner;

public class Clocksync {
	final static int INF = 9999, SWITCHES = 10, CLOCKS = 16;
	// linked[i][j] = 'x': i번 스위치와 j번 시계가 연결되어 있다.
	// linked[i][j] = '.': i번 스위치와 j번 시계가 연결되어 있지 않다.
	static final String[] linked = {
			"xxx.............",
			"...x...x.x.x....",
			"....x.....x...xx",
			"x...xxxx........",
			"......xxx.x.x...",
			"x.x...........xx",
			"...x..........xx",
			"....xx.x......xx",
			".xxxxx..........",
			"...xxx...x...x.."
	};
	
	static int c; // Test Case
	static int[] clocks;
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		c = Integer.parseInt(sc.nextLine().trim());
		
		for(int i = 0; i < c; ++i) {
			clocks = Arrays.stream(sc.nextLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
			
			int result = solve(clocks, 0);
			if(result >= INF) {
				result = -1;
			}
			System.out.println(result);
		}
	}
	
	// 모든 시계가 12시를 가리키고 있는지 확인한다.
	static boolean areAligned(int[] clocks) {
		return Arrays.stream(clocks).allMatch(v -> v==12);
	}
	
	// swtch번 스위치를 누른다.
	static void push(int[] clocks, int swtch) {
		for(int clock = 0; clock < CLOCKS; ++clock) {
			if(linked[swtch].charAt(clock) == 'x') {
				clocks[clock] += 3;
				if(clocks[clock] == 15) {
					clocks[clock] = 3;
				}
			}
		}
	}
	
	// clocks: 현재 시계들의 상태
	// swtch: 이번에 누를 위치
	// 의 번호가 주어질 때, 남은 스위치들을 눌러서 clocks를 12시로 맞출 수 있는 최소 횟수를 반환한다.
	// 만약 불가능하다면 INF 이상의 큰 수를 반환한다.
	static int solve(int[] clocks, int swtch) {
		if(swtch == SWITCHES) {
			return areAligned(clocks) ? 0 : INF;
		}
		// 이 스위치를 0번 누르는 경우부터 세 번 누르는 경우까지를 모두 시도한다.
		int ret = INF;
		for(int cnt = 0; cnt < 4; ++cnt) {
			ret = Math.min(ret,  cnt + solve(clocks, swtch + 1));
			push(clocks, swtch);
		}
		// push(clocks, swtch)가 네 번 호출되었으니 clocks는 원래와 같은 상태가 된다.
		return ret;
	}
	
}


//3
//12 6 6 6 6 6 12 12 12 12 12 12 12 12 12 12 
//12 9 3 12 6 6 9 3 12 9 12 9 12 12 6 6
//6 12 6 12 6 12 6 12 6 12 12 12 12 12 12 12 
