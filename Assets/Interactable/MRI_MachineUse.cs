using UnityEngine;
using System.Collections;

public class MRI_MachineUse : MonoBehaviour, IInteractable
{ bool UseMRI = false;
    public GameObject playerCam;
    public GameObject mriCam;
    public GameObject Player;
    public Animator MRIAnimator;

    public AudioSource MRIaudioController;

      public WorldInteractUI worldInteractUI;
    public string GetInteractText()
    {
        return UseMRI ? "No use" : "Use";
    }

    public void Interact(Transform interactor)
    {

    }

    public void OnInteract()
    {
        UseMRI = true;
        playerCam.SetActive(false);
        Player.SetActive(false);
        mriCam.SetActive(true);
               worldInteractUI.Show(
            "[E] " +
            GetInteractText());
        StartCoroutine(DelayonMovingBed());
    }

    IEnumerator DelayonMovingBed ()
    { 
        worldInteractUI.Hide();
        yield return new WaitForSeconds(1);
        MRIAnimator.SetBool("MRI_INOUT",true);

        yield return new WaitForSeconds(5);
        MRIaudioController.Play();
        
        yield return new WaitForSeconds(10);
        MRIAnimator.SetBool("MRI_INOUT", false);
        MRIaudioController.Stop();
        yield return new WaitForSeconds(6);
        playerCam.SetActive(true);
        Player.SetActive(true);
        mriCam.SetActive(false);

       
    }

}
