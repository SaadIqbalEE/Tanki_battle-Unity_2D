using UnityEngine;
using UnityEngine.UI;
using System.Collections;


public class control : MonoBehaviour {

	public Button Starts;
	public Button Option;
	public Button Quit;
    public Button Credit;
    public Button back;

    // Use this for initialization
    void Start () 
	{
		Starts = Starts.GetComponent<Button> ();
		Option = Option.GetComponent<Button> ();
		Quit = Quit.GetComponent<Button> ();

	}
	
	public void pressgo(){
		Application.LoadLevel ("a1");
	}

	public void pressoption(){
		Application.LoadLevel ("secon_scene");
	
	}

    public void presscredits()
    {
        Application.LoadLevel("Credits");

    }

    public void pressquit(){
		Application.Quit();
	}

    public void returna() {
        Application.LoadLevel("first_scene");
    }
}
