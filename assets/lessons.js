/* Original educational content. Every item is a self-contained, step-through lesson. */
const L=[];
function add(section,id,title,intro,vars,stages,quiz,transfer,teacher){L.push({section,id,title,intro,vars,stages:stages.map(([head,text,domains,focus,edges])=>({head,text,domains,focus:focus||[],edges:edges||[]})),quiz,transfer,teacher});}
const Q=(q,a,b,c,correct,why)=>({q,options:[a,b,c],correct,why});
// Section 5.1: defining CSPs, examples, variants.
add('5.1 Foundations','5.1','What exactly is a CSP?','A CSP consists of variables (what we must decide), domains (values we may choose), and constraints (rules that legal choices must obey).',['A','B'],[
['Meet the variables','A and B are two neighboring territories. Each must receive a color.',[['Red','Green'],['Red','Green']]],
['List the domains','Both territories can initially be Red or Green. The domain is the list of candidates—not a decision.',[['Red','Green'],['Red','Green']]],
['State the constraint','The binary constraint A ≠ B forbids equal colors.',[['Red','Green'],['Red','Green']],['A','B'],[['A','B']]],
['Try an assignment','Suppose A = Red. The constraint now rules out Red for B.',[['Red'],['Green']],['A','B'] ],
['Check completeness','A = Red and B = Green assigns every variable and satisfies A ≠ B. This is a solution.',[['Red'],['Green']],['A','B']]
],Q('Which item is a domain?','A ≠ B','{Red, Green}','A is a variable',1,'A domain is a set of possible values.'),'Every CSP solution must assign a value to every variable without violating constraints.','Ask students to classify “room”, “Room 101”, and “two classes cannot share a room”.');
add('5.1 Foundations','5.1-map','Map coloring example','Think of each region as a variable. Neighboring regions must have different colors.',['WA','NT','SA'],[
['Create the map variables','Western Australia (WA), Northern Territory (NT) and South Australia (SA) are three regions.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']]],
['Connect neighbors','These three regions each share a boundary with the other two, so all three pairs must differ.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']],['WA','NT','SA'],[['WA','NT'],['WA','SA'],['NT','SA']]],
['Color WA','Assign WA = Red; SA and NT can no longer use Red.',[['Red'],['Green','Blue'],['Green','Blue']],['WA']],
['Color NT','Assign NT = Green. SA must now avoid both Red and Green.',[['Red'],['Green'],['Blue']],['NT','SA']],
['Finish','Assign SA = Blue. Every shared border joins different colors.',[['Red'],['Green'],['Blue']],['WA','NT','SA']]
],Q('What does WA ≠ NT mean?','The regions must be different colors','Their regions must have different sizes','WA must be Red',0,'The ≠ constraint forbids identical assigned colors.'),'Add Queensland and NSW on paper and have students draw their constraint edges.','Show the constraint graph: variables are vertices and binary constraints are edges.');
add('5.1 Foundations','5.1-scheduling','Job-shop and classroom scheduling','A scheduling CSP assigns times or resources to activities while respecting capacity, order, and non-overlap rules.',['Lab','Exam','Room'],[
['Identify decisions','Lab and Exam need a time slot; Room is already reserved for the Exam.',[['9 AM','11 AM'],['9 AM','11 AM'],['11 AM']]],
['Identify restrictions','Lab and Exam cannot occupy the same room at the same time. Exam must use the reserved room slot.',[['9 AM','11 AM'],['9 AM','11 AM'],['11 AM']],['Exam','Room']],
['Fix the exam','The exam starts at 11 AM. The lab cannot also use 11 AM in this single-room example.',[['9 AM','11 AM'],['11 AM'],['11 AM']],['Exam']],
['Schedule the lab','Choose Lab = 9 AM. All activities fit the resource restrictions.',[['9 AM'],['11 AM'],['11 AM']],['Lab','Exam']]
],Q('What is a scheduling constraint?','A list of students','Two events cannot share a room and time','The name of the exam',1,'Constraints enforce legal timetables.'),'In a real model, use variables for activities and domains for tuples (room,time).','Explain that illustrative domains are simplified; industrial job-shop CSPs also have precedence and durations.');
add('5.1 Foundations','5.1-variations','CSP variations and constraint types','Domains may be finite, continuous, Boolean or structured. Constraints may involve one, two, or many variables.',['X','Y','Z'],[
['Unary constraint','X ≠ 2 involves only one variable.',[['1','2','3'],['1','2','3'],['1','2','3']],['X']],
['Apply unary restriction','Remove 2 from X.',[['1','3'],['1','2','3'],['1','2','3']],['X']],
['Binary constraint','X < Y relates two variables, for example X = 1 and Y = 2.',[['1'],['2'],['1','2','3']],['X','Y'],[['X','Y']]],
['Global constraint','AllDiff(X,Y,Z) requires all three to have distinct values. With X=1 and Y=2, Z must be 3.',[['1'],['2'],['3']],['X','Y','Z']]
],Q('Which is a global constraint?','X ≠ 2','X < Y','AllDiff(X,Y,Z)',2,'AllDiff relates several variables at once.'),'A domain can consist of time slots, integers, or other objects—not only colors.','Discuss finite discrete vs continuous domains and hard vs preference constraints.');
// 5.2
add('5.2 Propagation','5.2','Inference and propagation','Search makes new guesses; propagation uses known constraints to reduce domains before another guess is needed.',['A','B','C'],[
['Start without assignments','A, B and C each have two colors and A ≠ B, B ≠ C.',[['Red','Blue'],['Red','Blue'],['Red','Blue']],[],[['A','B'],['B','C']]],
['Learn a fact','A is forced to Red by a separate restriction.',[['Red'],['Red','Blue'],['Red','Blue']],['A']],
['Propagate A to B','B cannot be Red, because A ≠ B. Keep Blue.',[['Red'],['Blue'],['Red','Blue']],['B']],
['Propagate B to C','C cannot be Blue, leaving Red. No guessing was necessary for B or C.',[['Red'],['Blue'],['Red']],['C']]
],Q('What is propagation?','Trying random combinations','Reducing domains from existing constraints','Discarding all constraints',1,'Propagation derives restrictions from rules already known.'),'Think of a ripple effect: a domain changes, then neighboring domains may change.','Ask: How is removal of a candidate different from committing to an assignment?');
add('5.2 Propagation','5.2.1','Node consistency','A node is consistent when every candidate in its domain satisfies all unary constraints on that variable.',['SA'],[
['Define variable and domain','SA can be Red, Green or Blue.',[['Red','Green','Blue']]],
['Read unary rule','The rule is SA ≠ Green. It refers only to SA.',[['Red','Green','Blue']],['SA']],
['Test Red','Red ≠ Green is true, so Red survives.',[['Red','Green','Blue']],['SA']],
['Test Green','Green ≠ Green is false; Green is forbidden.',[['Red','Green','Blue']],['SA']],
['Delete forbidden candidate','Remove Green from SA.',[['Red','Blue']],['SA']],
['Test Blue','Blue ≠ Green is true. Remaining domain is {Red, Blue}. SA is now node-consistent.',[['Red','Blue']],['SA']]
],Q('After enforcing SA ≠ Green, what remains?','{Red, Blue}','{Green}','{Red, Green, Blue}',0,'Only Green violated the unary constraint.'),'Distinguish restricting the domain from selecting a final value.','Make students verbally test each original value, not merely memorize the output.');
add('5.2 Propagation','5.2.2','Arc consistency: support','For a directed arc (X,Y), every x in domain(X) needs at least one supporting y in domain(Y) satisfying their binary constraint.',['X','Y'],[
['Inspect directed arc (Y,X)','X is forced Red; Y still allows Red or Green. Constraint X ≠ Y.',[['Red'],['Red','Green']],['Y'],[['X','Y']]],
['Test Y = Red','Only X = Red is available. Red ≠ Red is false. There is no support.',[['Red'],['Red','Green']],['Y']],
['Eliminate unsupported Red','Remove Red from domain(Y).',[['Red'],['Green']],['Y']],
['Test Y = Green','X = Red supports Green because Green ≠ Red.',[['Red'],['Green']],['Y']],
['Check reverse direction','X = Red has support in Y = Green. Both arcs are now consistent.',[['Red'],['Green']],['X','Y']]
],Q('What is a supporting value?','A value in the neighboring domain satisfying the binary constraint','Any different variable name','Any discarded candidate',0,'Every value must have at least one compatible neighbor value.'),'Arc consistency can leave multiple values; it does not necessarily assign either variable.','State the directional asymmetry: checking (X,Y) is different from checking (Y,X).');
add('5.2 Propagation','5.2.2-AC3','AC-3: queue and REVISE','AC-3 repeatedly processes directed arcs. If an arc revision shrinks a domain, incoming arcs from its other neighbors may need to be reconsidered.',['A','B','C'],[
['Initialize directed queue','Start with (A,B),(B,A),(B,C),(C,B). A={Red}, B={Red,Green}, C={Green,Blue}.',[['Red'],['Red','Green'],['Green','Blue']],[],[['A','B'],['B','C']]],
['Pop (B,A)','Run REVISE(B,A). Test B=Red: no A value differs from Red.',[['Red'],['Red','Green'],['Green','Blue']],['B']],
['Delete B=Red','B shrinks to {Green}. Since B changed, revisit (C,B).',[['Red'],['Green'],['Green','Blue']],['B']],
['Pop (C,B)','C=Green lacks support because B has only Green.',[['Red'],['Green'],['Green','Blue']],['C']],
['Remove C=Green','C shrinks to {Blue}. No further revision is necessary for this chain.',[['Red'],['Green'],['Blue']],['C']],
['Queue empties','All directed arcs are consistent. AC-3 returns true (but true does not always mean the CSP is solved).',[['Red'],['Green'],['Blue']],['A','B','C']]
],Q('When should AC-3 re-enqueue neighboring arcs?','Whenever a domain shrinks','Whenever an arc is popped, even if unchanged','Never',0,'A changed domain can invalidate support in other neighbors.'),'Try A={Red}, B={Red}, A≠B. REVISE empties a domain, so AC-3 returns false.','Walk through queue orientation on the board: after changing Xi, append (Xk,Xi), not (Xi,Xk).');
add('5.2 Propagation','5.2.3','Path consistency','A consistent pair of assignments should be extendable to a third variable; testing triples can uncover contradictions that arc consistency misses.',['WA','SA','NT'],[
['Two-color triangle','All three regions share borders. Every one of WA, SA, NT has Red or Blue.',[['Red','Blue'],['Red','Blue'],['Red','Blue']],[],[['WA','SA'],['WA','NT'],['SA','NT']]],
['Why arcs alone miss it','For each Red on one endpoint, Blue supports it on the other; similarly Blue is supported by Red.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]],
['Select a consistent pair','WA=Red and SA=Blue obey WA≠SA.',[['Red'],['Blue'],['Red','Blue']],['WA','SA']],
['Try NT=Red','NT=Red conflicts with WA=Red.',[['Red'],['Blue'],['Red','Blue']],['NT']],
['Try NT=Blue','NT=Blue conflicts with SA=Blue. Neither NT candidate works.',[['Red'],['Blue'],[]],['NT']],
['Test other pair','WA=Blue and SA=Red is symmetric and also lacks any supporting NT value. No consistent WA-SA pair extends to NT.',[['Red','Blue'],['Red','Blue'],[]],['WA','SA','NT']]
],Q('Why is a two-color triangle impossible?','Because every pair can differ','Because the third node cannot differ from two differently colored neighbors','Because there are no variables',1,'A third region needs a third color when all three touch one another.'),'Explain that we temporarily restrict to a pair to test its extension; the last empty domain depicts failure of that test, not a globally revised unary domain.','Emphasize pairs with a common third node and the necessity of compatible extensions.');
add('5.2 Propagation','5.2.4','k-consistency and strong k-consistency','k-consistency asks whether any consistent assignment to k−1 variables can be extended to a specified kth variable. Strong k-consistency includes every lower level.',['A','B','C'],[
['1-consistency','Every variable has a value satisfying unary constraints. Here each has two colors.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]],
['Try 2-consistency','A=Red can extend to B=Blue under A≠B.',[['Red'],['Blue'],['Red','Blue']],['A','B']],
['Check a third variable','A=Red and B=Blue is a consistent pair. C must differ from both.',[['Red'],['Blue'],['Red','Blue']],['C']],
['3-consistency fails','No possible C differs from both Red and Blue. The CSP is strongly 2-consistent but not 3-consistent.',[['Red'],['Blue'],[]],['C']],
['Relate to complexity','Stronger consistency often prunes more deeply, but higher levels can require much more computational time and storage.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]]
],Q('Strong 3-consistency requires which levels?','Only level 3','Levels 1, 2 and 3','Only level 2',1,'Strong k-consistency requires all j-consistency levels up to k.'),'Discuss why strong n-consistency in finite CSPs makes backtrack-free ordered assignment possible.','Mention that consistency checking can be expensive; stronger is not always faster overall.');
add('5.2 Propagation','5.2.5','Global constraints: AllDiff','AllDiff is one constraint over several variables, requiring all their assigned values to be different.',['A','B','C'],[
['Declare AllDiff(A,B,C)','Each variable may have Red or Blue, and every assignment must use a distinct color.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]],
['Count the variables','Three variables must receive different values.',[['Red','Blue'],['Red','Blue'],['Red','Blue']],['A','B','C']],
['Count available values','There are only two distinct values across their combined domains: Red and Blue.',[['Red','Blue'],['Red','Blue'],['Red','Blue']],['A','B','C']],
['Apply pigeonhole reasoning','Three distinct assignments cannot be drawn from just two values. The CSP is inconsistent.',[['Red','Blue'],['Red','Blue'],['Red','Blue']],['A','B','C']],
['Understand the advantage','A global AllDiff propagator can detect collective impossibility even when every individual binary inequality is arc-consistent.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]]
],Q('Why can AllDiff fail here?','Because Red is disallowed','Because 3 variables need distinct values but only 2 exist','Because domains are not integers',1,'A necessary condition is that the union contains enough distinct values.'),'Have students test Hall sets: {A,B} with domains {1,2} forces a third variable C with {1,2,3} to take 3.','Global constraints can be much stronger than treating everything as separate binary arcs.');
add('5.2 Propagation','5.2.5-resources','AtMost resource constraints','Resource constraints limit the combined use of staff, machines, money, rooms, or other scarce resources.',['P1','P2','P3','P4'],[
['Four tasks','Each task requires 3 to 6 people; total available staff is at most 10.',[['3','4','5','6'],['3','4','5','6'],['3','4','5','6'],['3','4','5','6']]],
['Take each minimum','The minimum on P1, P2, P3, and P4 is 3.',[['3'],['3'],['3'],['3']],['P1','P2','P3','P4']],
['Sum minimum personnel','3 + 3 + 3 + 3 = 12.',[['3'],['3'],['3'],['3']]],
['Compare with capacity','12 is greater than 10. Even the least expensive staffing assignment exceeds capacity.',[['3'],['3'],['3'],['3']],['P1','P2','P3','P4']],
['Reject impossible CSP','No permitted staffing allocation fits the at-most-10 constraint.',[['3'],['3'],['3'],['3']]]
],Q('How many staff are required at minimum?','10','12','24',1,'Four tasks each require at least 3, for a sum of 12.'),'The textbook also considers deleting upper domain values that cannot fit given other variables’ minimum requirements.','Explain that singleton displays during arithmetic are temporary minima, not assignments actually made.');
add('5.2 Propagation','5.2.5-bounds','Bounds propagation','Large integer domains are often summarized by lower and upper bounds rather than enumerating each legal integer.',['F1','F2'],[
['Flight capacities','F1 can carry 0–165 people; F2 can carry 0–385. Together they must carry exactly 420.',[['0…165'],['0…385']]],
['Bound F1 from below','F2 carries at most 385, so F1 must carry at least 420 − 385 = 35.',[['35…165'],['0…385']],['F1']],
['Bound F2 from below','F1 carries at most 165, so F2 must carry at least 420 − 165 = 255.',[['35…165'],['255…385']],['F2']],
['Confirm feasible endpoints','At one extreme F1=35,F2=385; at the other F1=165,F2=255. Both add to 420.',[['35…165'],['255…385']],['F1','F2']],
['Finish','The narrowed bounds exclude impossible passenger counts while preserving every feasible solution.',[['35…165'],['255…385']]]
],Q('What is F1’s new lower bound?','0','35','255',1,'F1 ≥ 420−385=35.'),'Try making the target total 500; students should detect it is still within the combined maximum 550.','Make it clear that a bound interval is not an enumerated list of candidates.');
add('5.2 Propagation','5.2.6','Sudoku as a CSP','Sudoku has 81 cell variables, digit domains 1–9, and 27 AllDiff constraints: 9 rows, 9 columns, and 9 boxes.',['E6'],[
['One Sudoku cell','Cell E6 is an empty cell with possible digits 1 through 9.',[['1','2','3','4','5','6','7','8','9']]],
['Consider its box','The center 3×3 box contains 1, 2, 7 and 8 elsewhere. Remove those digits.',[['3','4','5','6','9']],['E6']],
['Check its column','The column contains 3, 5, 6 and 9 in other cells. Remove them.',[['4']],['E6']],
['Find forced digit','E6 must be 4. No value was guessed; other filled cells and AllDiff rules forced it.',[['4']],['E6']],
['Propagate onward','E6=4 removes 4 from candidate domains of every unassigned peer in E6’s row, column, and box.',[['4']],['E6']]
],Q('How many AllDiff groups exist in standard Sudoku?','9','18','27',2,'9 rows + 9 columns + 9 boxes = 27.'),'The E6 sequence follows the textbook example; practice grid is independently authored to avoid reproducing the book illustration.','Sudoku can require stronger inference or backtracking on harder puzzles.');
// 5.3
add('5.3 Backtracking','5.3','Backtracking search','Backtracking assigns one variable at a time, checks constraints, and reverses a decision when it cannot be extended to a complete solution.',['A','B','C'],[
['Start empty','All variables have two candidates. A ≠ B, B ≠ C and A ≠ C.',[['Red','Green'],['Red','Green'],['Red','Green']]],
['Assign A','Try A=Red. No conflict yet.',[['Red'],['Red','Green'],['Red','Green']],['A']],
['Try B=Red','A and B are neighbors: Red conflicts with Red. Reject this attempt.',[['Red'],['Red'],['Red','Green']],['A','B']],
['Backtrack on B','Undo B=Red and try B=Green.',[['Red'],['Green'],['Red','Green']],['B']],
['Try C=Red','C=Red conflicts with A=Red.',[['Red'],['Green'],['Red']],['A','C']],
['Try C=Green','C=Green conflicts with B=Green. C has no available candidate.',[['Red'],['Green'],[],],['C']],
['Return failure','No two-color solution exists for three pairwise adjacent nodes. Search must undo earlier assignments or report failure.',[['Red','Green'],['Red','Green'],['Red','Green']]]
],Q('What does backtracking undo?','A previous tentative assignment','The existence of variables','The constraint itself',0,'Constraints remain; only tentative assignments are rolled back.'),'Compare propagation (remove provably impossible values) with search (temporarily commit to a candidate).','The simplified tree includes one explored branch; all other branches are symmetric and also fail.');
add('5.3 Backtracking','5.3.1-MRV','MRV variable selection','Minimum Remaining Values (MRV) chooses the unassigned variable with the fewest legal values.',['A','B','C'],[
['Read domains','A has 3 candidates, B has 1, C has 2.',[['Red','Green','Blue'],['Green'],['Red','Blue']]],
['Count A','A has three legal choices.',[['Red','Green','Blue'],['Green'],['Red','Blue']],['A']],
['Count B','B has just one legal choice: Green.',[['Red','Green','Blue'],['Green'],['Red','Blue']],['B']],
['Count C','C has two legal choices.',[['Red','Green','Blue'],['Green'],['Red','Blue']],['C']],
['Pick the minimum','MRV chooses B because 1 is the smallest remaining domain size.',[['Red','Green','Blue'],['Green'],['Red','Blue']],['B']],
['Assign the forced value','Set B=Green and propagate constraints before selecting the next variable.',[['Red','Green','Blue'],['Green'],['Red','Blue']],['B']]
],Q('Which variable does MRV choose first?','A','B','C',1,'B has one possible value, which is fewer than A or C.'),'Explain fail-first: tackle the most constrained variable to expose contradictions early.','MRV is dynamic: scores must be recalculated as domains shrink.');
add('5.3 Backtracking','5.3.1-degree','Degree heuristic','When MRV ties, choose the variable with the most constraints on still-unassigned neighbors.',['A','B','C','D'],[
['Tie on domains','Every variable has two values, so MRV cannot decide.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']]],
['Count active edges','A is connected to B, C and D. B, C and D each have only one active link to A.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],['A'],[['A','B'],['A','C'],['A','D']]],
['Select highest degree','A has degree 3; other variables have degree 1. Pick A.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],['A']],
['Update after assignment','After A is assigned, recalculate active constraints among remaining unassigned variables.',[['Red'],['Blue'],['Blue'],['Blue']],['A']]
],Q('What does the degree heuristic count?','Number of neighboring unassigned variables constrained','Total colors used','Number of recursive calls',0,'The heuristic favors the most constraining variable among MRV ties.'),'Distinguish a static graph degree from active degree among unassigned variables.','In this star graph, leaves can share Blue because they have no constraint with each other.');
add('5.3 Backtracking','5.3.1-LCV','LCV value ordering','Least Constraining Value (LCV) tries the value that eliminates the fewest candidates in neighbors.',['A','B','C'],[
['Read candidate domains','A = {Red,Blue}, B = {Red,Green}, C = {Red,Blue}. A differs from both neighbors.',[['Red','Blue'],['Red','Green'],['Red','Blue']]],
['Hypothesize A=Red','If A=Red, B loses Red and C loses Red: two values eliminated.',[['Red'],['Green'],['Blue']],['A','B','C']],
['Undo hypothetical test','Restore the domains to compare the alternative fairly.',[['Red','Blue'],['Red','Green'],['Red','Blue']],['A']],
['Hypothesize A=Blue','If A=Blue, B loses none (it had no Blue), while C loses Blue: one value eliminated.',[['Blue'],['Red','Green'],['Red']],['A','C']],
['Compare scores','Red eliminates 2 candidate values; Blue eliminates 1. LCV chooses Blue first.',[['Blue'],['Red','Green'],['Red']],['A']]
],Q('LCV chooses a value that…','Removes the most choices','Keeps the most neighbor choices','Always has the lowest numeric value',1,'LCV preserves maximum future flexibility.'),'A value-choice order may improve search but does not change the set of valid solutions.','Tell students to count eliminated neighbor values, not the number of neighbors.');
add('5.3 Backtracking','5.3.2','Interleaving search and inference','After each tentative assignment, run forward checking or another propagator. If a domain becomes empty, undo the assignment immediately.',['A','B','C'],[
['Start search','A={Red,Blue}, B={Red,Green}, C={Green}. A≠B, B≠C.',[['Red','Blue'],['Red','Green'],['Green']]],
['Search chooses A=Blue','Make a tentative assignment. A has only Blue in this branch.',[['Blue'],['Red','Green'],['Green']],['A']],
['Forward check A–B','Since A=Blue and B has no Blue, no value is eliminated from B.',[['Blue'],['Red','Green'],['Green']],['B']],
['Propagate B–C','Because C=Green, B cannot Green, leaving B=Red.',[['Blue'],['Red'],['Green']],['B']],
['Complete consistent assignment','A=Blue, B=Red, C=Green meets both constraints. Search plus propagation finds a solution.',[['Blue'],['Red'],['Green']],['A','B','C']]
],Q('When should the search immediately undo a choice?','When one unassigned variable loses every possible value','When there are two candidates remaining','After every successful assignment',0,'An empty domain proves the current branch cannot be extended.'),'Demonstrate an immediate dead end by adding A≠C while forcing A=Green and C=Green.','In implementation, store domain removals on a trail so backtracking can restore them correctly.');
add('5.3 Backtracking','5.3.3','Intelligent backtracking','Chronological backtracking undoes the most recent assignment; conflict-directed backjumping can jump over assignments unrelated to a failure.',['A','B','C','D'],[
['Assign variables in order','A=Red, then B=Green, C=Blue. D remains to be assigned.',[['Red'],['Green'],['Blue'],['Red','Green']]],
['Reveal relevant constraints','D must differ from A and B; C has no constraint with D.',[['Red'],['Green'],['Blue'],['Red','Green']],['A','B','D'],[['A','D'],['B','D']]],
['Test D=Red','It conflicts with A=Red.',[['Red'],['Green'],['Blue'],['Red','Green']],['A','D']],
['Test D=Green','It conflicts with B=Green. D has no valid candidate.',[['Red'],['Green'],['Blue'],[]],['B','D']],
['Analyze conflict','C did not cause the failure. Jumping back to B can be more useful than merely changing C.',[['Red'],['Green'],['Blue'],[]],['A','B','D']],
['Backjump','Restore D and revise the relevant earlier assignment B (or A as conflict analysis dictates).',[['Red'],['Red','Green'],['Blue'],['Red','Green']],['B']]
],Q('Which variable is irrelevant to D’s conflict?','A','B','C',2,'C has no constraint with D in this example.'),'Show a conflict set such as {A,B}; backjumping uses reasons, not just recursion depth.','A real solver’s exact jump target depends on its conflict set and variable ordering.');
add('5.3 Backtracking','5.3.4','Constraint learning','After finding a conflict, a solver can remember a nogood: a combination of assignments that must never be repeated.',['A','B','D'],[
['Start a branch','Try A=Red, B=Green and D∈{Red,Green}. D must differ from A and B.',[['Red'],['Green'],['Red','Green']]],
['Recognize conflict','D=Red violates A≠D; D=Green violates B≠D. No D value works.',[['Red'],['Green'],[]],['D']],
['Learn a nogood','Remember: not(A=Red AND B=Green). This combination cannot extend to a solution with current D domain.',[['Red'],['Green'],[]],['A','B']],
['Continue elsewhere','On a later branch, if A=Red and B=Green recurs, reject it immediately based on the learned reason.',[['Red'],['Green'],['Red','Green']],['A','B']],
['Why learning helps','Avoid repeated exploration of the same failed combination across multiple search branches.',[['Red','Green'],['Red','Green'],['Red','Green']]]
],Q('What is a nogood?','A proven forbidden combination of assignments','A list of all possible solutions','A random heuristic score',0,'Learning stores a reason that a partial assignment cannot be extended.'),'Discuss why a learned constraint must be logically entailed by the original constraints.','In this simplified lesson D’s domain is globally {Red,Green}; therefore the nogood follows.');
// 5.4
add('5.4 Local search','5.4','Local search for CSPs','Local search starts with a complete assignment—even if it violates constraints—and repeatedly changes values to reduce conflicts.',['A','B','C'],[
['Assign every variable','Start with A=Red, B=Red, C=Blue on a triangle of inequality constraints.',[['Red'],['Red'],['Blue']],[],[['A','B'],['B','C'],['A','C']]],
['Count conflicts','A and B match Red, causing one violated edge. Other two edges are valid.',[['Red'],['Red'],['Blue']],['A','B']],
['Choose conflicting variable','Pick B as the candidate to repair.',[['Red'],['Red'],['Blue']],['B']],
['Try Green for B','Change B from Red to Green.',[['Red'],['Green'],['Blue']],['B']],
['Recount conflicts','A=Red, B=Green, C=Blue. All three neighboring pairs differ: 0 conflicts.',[['Red'],['Green'],['Blue']],['A','B','C']]
],Q('What is the initial state of local search?','An empty assignment','A complete assignment, possibly inconsistent','Only unary constraints',1,'Local search generally begins with values for every variable.'),'Contrast with backtracking which builds partial assignments from scratch.','Explain that local search is often incomplete and can get stuck.');
add('5.4 Local search','5.4-minconflicts','Min-conflicts heuristic','Pick a variable participating in a violated constraint, then choose a value that minimizes the number of violated constraints.',['A','B','C'],[
['Complete initial assignment','A=Red, B=Red, C=Blue. All pairs must differ.',[['Red'],['Red'],['Blue']],[],[['A','B'],['A','C'],['B','C']]],
['Identify conflict','A=B=Red is the only violated pair.',[['Red'],['Red'],['Blue']],['A','B']],
['Try candidate Red for B','Red causes conflict with A: 1 conflict.',[['Red'],['Red'],['Blue']],['B']],
['Try candidate Blue for B','Blue causes conflict with C: 1 conflict.',[['Red'],['Blue'],['Blue']],['B','C']],
['Try candidate Green for B','Green differs from both neighbors, giving zero conflicts.',[['Red'],['Green'],['Blue']],['B']],
['Keep best move','Choose B=Green and stop at zero violated constraints.',[['Red'],['Green'],['Blue']],['A','B','C']]
],Q('What does min-conflicts minimize?','Number of variables','Number of violated constraints after a move','Number of domains',1,'It chooses a repair that gives the fewest constraint violations.'),'Explain random tie-breaking and random restarts to escape flat landscapes or local minima.','Have students recount all edges after each candidate assignment.');
// 5.5
add('5.5 Structure','5.5','Constraint graph structure','A CSP with disconnected graph components can be solved one component at a time; tree-like structure permits efficient algorithms.',['A','B','C','D'],[
['Observe two components','A-B is separate from C-D. No constraint connects the components.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],[],[['A','B'],['C','D']]],
['Solve left component','Choose A=Red and B=Blue.',[['Red'],['Blue'],['Red','Blue'],['Red','Blue']],['A','B']],
['Solve right component','Choose C=Blue and D=Red.',[['Red'],['Blue'],['Blue'],['Red']],['C','D']],
['Combine solutions','Because components are independent, combine their assignments safely.',[['Red'],['Blue'],['Blue'],['Red']],['A','B','C','D']]
],Q('Why solve disconnected components separately?','They share all constraints','There are no cross-component constraints','All variables become identical',1,'Independent components can be solved separately.'),'For a tree CSP, arc consistency and a root-to-leaf assignment ordering can avoid backtracking.','Draw the graph and ask which edges would make components dependent.');
add('5.5 Structure','5.5-tree','Tree-structured CSPs','A tree has no cycles. After orienting its edges from a root, consistency can be enforced from leaves toward the root, followed by assignment from root toward leaves.',['A','B','C','D'],[
['Identify a tree','Edges A–B, B–C, B–D have no cycle.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],[],[['A','B'],['B','C'],['B','D']]],
['Choose root A','Order parents before children: A, B, C, D. Each non-root node has one parent.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],['A']],
['Enforce arcs toward root','From leaves to root, revise parents against child domains. In this example every color has a supporting opposite color.',[['Red','Blue'],['Red','Blue'],['Red','Blue'],['Red','Blue']],['B','C','D']],
['Assign root','Set A=Red.',[['Red'],['Red','Blue'],['Red','Blue'],['Red','Blue']],['A']],
['Assign B','Set B=Blue to differ from A.',[['Red'],['Blue'],['Red','Blue'],['Red','Blue']],['B']],
['Assign leaves','Set C=Red and D=Red. All parent–child constraints hold.',[['Red'],['Blue'],['Red'],['Red']],['C','D']]
],Q('What important property does a tree graph have?','At least one cycle','No cycles','No constraints',1,'A tree is a connected acyclic graph.'),'Correct root-direction matters: make each parent arc-consistent with its child by processing children backward, then assign forward.','For finite domains a tree CSP can be solved in O(n d²), where n is the number of variables.');
add('5.5 Structure','5.5.1','Cutset conditioning','Choose a small set of variables whose removal leaves a tree; try assignments to the cutset, then solve the remaining tree CSP.',['A','B','C','D'],[
['Start with a cycle','Edges A–B, B–C, C–A and C–D contain a triangle A–B–C.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']],[],[['A','B'],['B','C'],['A','C'],['C','D']]],
['Choose a cutset','Removing variable A breaks the triangle. Remaining edges B–C–D form a tree.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']],['A']],
['Condition on A','Try A=Red. Neighbors B and C must avoid Red.',[['Red'],['Green','Blue'],['Green','Blue'],['Red','Green','Blue']],['A']],
['Solve remaining tree','Choose B=Green, C=Blue, D=Red. The tree is consistent.',[['Red'],['Green'],['Blue'],['Red']],['B','C','D']],
['Conclude','The cutset guess plus efficient tree solving produced a full solution. If it failed, try another A value.',[['Red'],['Green'],['Blue'],['Red']],['A','B','C','D']]
],Q('What does removing a cutset achieve?','Leaves a cycle-free graph','Deletes all variables permanently','Increases the number of constraints',0,'A cycle cutset leaves a tree or forest.'),'Complexity depends exponentially on cutset size, rather than all n variables.','The cutset is conditioned on, not permanently deleted from the original solution.');
add('5.5 Structure','5.5.2','Tree decomposition','Group variables into overlapping clusters (bags), arrange bags in a tree, and coordinate their shared variables.',['A,B','B,C','C,D'],[
['Original chain','Imagine original constraints A–B, B–C, C–D.',[['Red','Blue'],['Red','Blue'],['Red','Blue']]],
['Build bags','Bag 1 is {A,B}; bag 2 is {B,C}; bag 3 is {C,D}. Each original constraint occurs in at least one bag.',[['A=Red','B=Blue'],['B=Blue','C=Red'],['C=Red','D=Blue']],[],[['A,B','B,C'],['B,C','C,D']]],
['Match overlap B','Bag 1 and bag 2 both contain B. Their B values must agree.',[['B=Blue'],['B=Blue'],['C=Red','D=Blue']],['A,B','B,C']],
['Match overlap C','Bag 2 and bag 3 both contain C. Their C values must agree.',[['A=Red','B=Blue'],['B=Blue','C=Red'],['C=Red','D=Blue']],['B,C','C,D']],
['Combine bags','A=Red, B=Blue, C=Red, D=Blue forms a consistent assignment. Small bags often make search manageable.',[['A=Red','B=Blue'],['B=Blue','C=Red'],['C=Red','D=Blue']]]
],Q('Why must overlapping bags agree?','They contain shared variables','Their titles match','Bags have no constraints',0,'A shared variable must have the same assignment across all bags containing it.'),'Explain running-intersection: all bags containing a variable must form a connected subtree.','Real tree decompositions are useful when treewidth (roughly, largest bag minus one) is small.');
add('5.5 Structure','5.5.3','Value symmetry','When renaming interchangeable values does not affect validity, a solver can break the symmetry to avoid exploring equivalent solutions.',['A','B','C'],[
['Symmetric colors','A, B, C form a triangle. All have Red, Green or Blue, and neighbors must differ.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']]],
['One complete assignment','A=Red, B=Green, C=Blue is legal.',[['Red'],['Green'],['Blue']]],
['Rename colors','A=Blue, B=Red, C=Green is also legal. It has the same structural pattern.',[['Blue'],['Red'],['Green']]],
['Break symmetry','With all colors interchangeable, choose a convention: A must be Red.',[['Red'],['Red','Green','Blue'],['Red','Green','Blue']],['A']],
['Search fewer equivalent branches','Only assignments satisfying the convention remain; genuinely distinct solutions up to color renaming are preserved.',[['Red'],['Green'],['Blue']],['A','B','C']]
],Q('When is color symmetry breaking valid?','When all colors are interchangeable under the constraints','When Red is forbidden by a unary rule','For every problem regardless of restrictions',0,'Symmetry reduction is sound only for genuine interchangeable values.'),'If one region has a unary rule forbidding Red, colors may no longer be freely interchangeable.','Separate “number of raw assignments” from “number of structurally distinct solutions”.');
add('Review','review','Chapter synthesis: pick the right tool','CSP solving combines variable choice, value choice, propagation, search, and graph structure.',['A','B','C'],[
['Model the problem','State variables, domains, and constraints before choosing a solver.',[['Red','Green','Blue'],['Red','Green','Blue'],['Red','Green','Blue']]],
['Propagate constraints','Use unary checks, arcs, and global constraints to shrink domains safely.',[['Red'],['Green','Blue'],['Green','Blue']],['A']],
['Choose smartly','MRV selects the most constrained variable; degree breaks ties; LCV orders candidate values.',[['Red'],['Green'],['Green','Blue']],['B']],
['Search if necessary','Try an assignment, propagate again, and undo on contradiction.',[['Red'],['Green'],['Blue']],['C']],
['Consider alternatives','For big problems, compare min-conflicts local search and graph-structure approaches.',[['Red'],['Green'],['Blue']],['A','B','C']]
],Q('What is a strong general CSP workflow?','Ignore constraints until the end','Model → propagate → select/order → search → learn','Randomly discard domain values',1,'Inference and guided search work together.'),'Use the lesson list as a review checklist and student presentation outline.','Return to the original map-coloring problem and ask students to narrate each solver choice.');
