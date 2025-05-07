//
//  LoginView.swift
//  IOSApp
//
//  Created by Molly Norman on 5/6/25.
//

import SwiftUI

struct LoginView: View {
    @State private var username: String = ""
    @State private var loginMessage: String = ""
    
    let login = ["Admin56"]
    
    var body: some View {
        VStack(spacing: 20){
            Text("Login")
            .font(.largeTitle)
            .multilineTextAlignment(.center)
            .padding()
            
            TextField("Username", text: $username)
                .padding()
                .background(Color.white)
                .cornerRadius(8)
                .frame(maxWidth: 300)
                .overlay(RoundedRectangle(cornerRadius: 8)
                .stroke(Color.black, lineWidth: 1)
                .frame(maxWidth: 400))
            
            Button {
                if login[0].contains(username) {
                    loginMessage = "Welcome, \(username)!"
                } else {
                    loginMessage = "Username not recognized."
                }
            } label: {
                Text("Log in")
                    .foregroundColor(.black)
                    .frame(maxWidth: 200)
                    .padding()
                    .background(Color.blue.opacity(0.6))
                    .cornerRadius(8)
            }
            Text(loginMessage)
            
            
        }
    }
}

#Preview {
    LoginView()
}
