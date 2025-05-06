import SwiftUI

struct ContentView: View {
    let validUsernames = ["user1", "user2", "user3"]

    @State private var username: String = ""
    @State private var resultMessage: String = ""
    @State private var navigateToSuccess: Bool = false

    var body: some View {
        NavigationStack {
            VStack {
                Text("Enter your username")
                    .font(.title)
                    .padding()

                TextField("Username", text: $username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()

                Button("Submit") {
                    let input = username.lowercased()
                    if validUsernames.contains(input) {
                        resultMessage = "1 (yes)"
                        navigateToSuccess = true
                    } else {
                        resultMessage = "0 (no)"
                    }
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(8)
                .padding(.bottom)

                Text(resultMessage)
                    .font(.headline)
                    .padding(.bottom)

                Spacer()
            }
            .padding()
            // New iOS 16+ style navigation
            .navigationDestination(isPresented: $navigateToSuccess) {
                Individual_Challange()
            }
        }
    }
}

#Preview {
    ContentView()
}
