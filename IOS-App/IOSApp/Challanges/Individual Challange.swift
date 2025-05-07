import SwiftUI

struct Individual_Challange: View {
    let challenges: [Challenge]
    let challengeDetails: [String: String]

    @State private var selectedChallenge: String?

    init() {
        let loadedChallenges = ChallengeLoader.loadChallenges()
        self.challenges = loadedChallenges
        self.challengeDetails = Dictionary(uniqueKeysWithValues: loadedChallenges.map { ($0.title, $0.detail) })
    }

    var body: some View {
        ZStack {
            // Scrollable content in the background
            ScrollView {
                VStack(alignment: .leading, spacing: 10) {
                    Spacer().frame(height: 100) // Space for top bar

                    ForEach(challenges, id: \.title) { challenge in
                        VStack {
                            Button(action: {
                                if selectedChallenge == challenge.title {
                                    selectedChallenge = nil // Deselect if clicked again
                                } else {
                                    selectedChallenge = challenge.title
                                }
                            }) {
                                Text(challenge.title)
                                    .padding()
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .background(Color.blue.opacity(0.1))
                                    .cornerRadius(8)
                            }
                            
                            // Show the description under the clicked button
                            if selectedChallenge == challenge.title {
                                Text(challengeDetails[challenge.title] ?? "")
                                    .padding(.top, 2)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .background(Color.blue.opacity(0.05))
                                    .cornerRadius(8)
                                    .padding(.top, 5)
                            }
                        }
                    }

                    Spacer().frame(height: 100) // Space for bottom bar
                }
                .padding()
            }

            // Top bar fixed
            VStack {
                Color.blue
                    .frame(height: 100)
                    .ignoresSafeArea(edges: .top)
                Spacer()
            }

            // Bottom bar fixed
            VStack {
                Spacer()
                Color.blue
                    .frame(height: 100)
                    .ignoresSafeArea(edges: .bottom)
            }
        }
        .edgesIgnoringSafeArea(.all)
    }
}

struct Individual_Challange_Previews: PreviewProvider {
    static var previews: some View {
        Individual_Challange()
    }
}
